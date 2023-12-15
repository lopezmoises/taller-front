import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ToastService } from '../../shared/toast.service'
import { ReparationService } from '../reparation.service'
import { Reparation, Report, ReportType, Status } from '../reparation.model'
import { StorageService } from '../../auth/storage.service'
import { DatePipe } from '@angular/common'

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
    public form: FormGroup
    public reparation: Reparation = { status: Status.RECIBIDO }
    public clientReports: Report[]
    public techReports: Report[]
    public readonly statuses = Object.values(Status)
    protected readonly event = event
    protected readonly ReportType = ReportType
    private reparationId: string

    constructor(
        private reparationService: ReparationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public toastService: ToastService,
        public storageService: StorageService,
        private datePipe: DatePipe,
    ) {
        this.form = this.formBuilder.group(
            {
                clientReport: [],
                techReport: [],
                budget: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
                status: [],
            },
            {
                updateOn: 'change',
            },
        )
    }

    public ngOnInit(): void {
        this.reparationId = this.route.snapshot.paramMap.get('id') ?? ''
        this.reparationService.getById(this.reparationId).subscribe({
            next: res => {
                this.reparation = res
                this.clientReports = res.clientReport || []
                this.techReports = res.techReport || []
                this.form.patchValue({
                    clientReport: this.showReport(ReportType.CLIENT),
                    techReport: this.showReport(ReportType.TECH),
                    budget: res.budget,
                    status: res.status,
                })
                if (res.delivered) {
                    ;['clientReport', 'techReport', 'budget', 'status'].forEach(c => {
                        this.form.controls[c].disable()
                        console.log(c)
                    })
                }
                console.log(res)
            },
            error: err => {
                console.error(err)
                /*this.toastService.show(getErrors(err.msg), 'Error', 'danger')*/
            },
        })
    }

    public onSave() {
        const reparation: Reparation = {
            clientReport: this.clientReports,
            techReport: this.techReports,
            budget: this.form.controls['budget'].value,
            status: this.form.controls['status'].value,
        }
        this.reparationService.update(this.reparationId, reparation).subscribe({
            next: () => {
                this.toastService.show('Éxito')
                this.ngOnInit()
            },
        })
    }

    public onDeliver() {
        this.reparationService.deliver(this.reparationId).subscribe({
            next: () => {
                this.toastService.show('Éxito')
                this.ngOnInit()
            },
        })
    }

    public inputIsValid(input: string): boolean {
        return !(this.form.get(input)?.invalid && this.form.get(input)?.touched)
    }

    public clearReport(reportName: string) {
        if (!this.reparation.delivered) {
            this.form.controls[reportName].patchValue('')
        }
    }

    public reloadReport(reportType: ReportType) {
        if (
            this.form.controls[reportType === ReportType.CLIENT ? 'clientReport' : 'techReport'].value &&
            !this.reparation.delivered
        ) {
            const newReport: Report = {
                message: this.form.controls[reportType === ReportType.CLIENT ? 'clientReport' : 'techReport'].value,
                type: reportType,
                technician: this.storageService.getCurrentUser(),
                date: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') ?? undefined,
            }
            if (reportType === ReportType.CLIENT) {
                this.clientReports.push(newReport)
            } else {
                this.techReports.push(newReport)
            }
        }
        this.form.controls['clientReport'].patchValue(this.showReport(ReportType.CLIENT))
        this.form.controls['techReport'].patchValue(this.showReport(ReportType.TECH))
    }

    private showReport(reportType: ReportType): string {
        const reports = reportType === ReportType.CLIENT ? this.clientReports : this.techReports

        let result = ''
        reports.forEach(report => {
            result += `${report.technician?.username} [${report.date}]: ${report.message} \n`
        })
        return result
    }
}
