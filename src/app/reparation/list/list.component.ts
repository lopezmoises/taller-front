import { Component, OnInit } from '@angular/core'
import { ReparationService } from '../reparation.service'
import { Reparation, Status } from '../reparation.model'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    public reparations: Reparation[]
    public form: FormGroup
    public listType: any

    constructor(
        public reparationService: ReparationService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group(
            {
                filter: ['', Validators.required],
            },
            {
                updateOn: 'change',
            },
        )
    }

    public ngOnInit() {
        this.listType = this.route.snapshot.paramMap.get('listType')
        switch (this.listType) {
            case 'ACEPTADAS': {
                this.getAceptadas()
                break
            }
            case 'PRONTAS': {
                this.getProntas()
                break
            }
            case 'EN_TALLER': {
                this.getEnTaller()
                break
            }
            default: {
                this.getAll()
            }
        }
    }

    public onSearch() {
        console.log(this.form.valid)
        console.log(this.form.controls['filter'].value)
        if (this.form.valid) {
            this.reparationService.search(this.form.controls['filter'].value).subscribe({
                next: res => (this.reparations = res),
                error: err => console.error(err),
            })
        } else {
            this.getAll()
        }
    }

    private getAceptadas() {
        this.reparationService.getAllByStatus(Status.ACEPTADO).subscribe({
            next: res => (this.reparations = res),
            error: err => console.error(err),
        })
    }

    private getProntas() {
        this.reparationService.getAllByStatus(Status.PRONTO).subscribe({
            next: res => (this.reparations = res),
            error: err => console.error(err),
        })
    }

    private getEnTaller() {
        this.reparationService.getAllByDelivered().subscribe({
            next: res => (this.reparations = res),
            error: err => console.error(err),
        })
    }

    private getAll() {
        this.reparationService.getAll().subscribe({
            next: res => (this.reparations = res),
            error: err => console.error(err),
        })
    }

    public statusColor(status: Status): string {
        switch (status) {
            case Status.RECIBIDO:
                return 'text-warning'
            case Status.PRESUPUESTADO:
                return 'text-info'
            case Status.ACEPTADO:
                return 'text-danger'
            case Status.PRONTO:
                return 'text-success'
            default:
                return 'text-secondary'
        }
    }
}
