import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReparationService } from '../reparation/reparation.service'
import { Reparation, Report, Status } from '../reparation/reparation.model'
import { IconStatusComponent } from './icon-status/icon-status.component'
import { ViewportScroller } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactService } from './contact.service'
import { Contact } from './contact.model'
import { BehaviorSubject } from 'rxjs'

@Component({
    selector: 'app-web',
    templateUrl: './web.component.html',
    styleUrls: ['./web.component.scss'],
})
export class WebComponent implements OnInit {
    public form: FormGroup
    public reparationUUID: string
    public reparation: Reparation
    public exitoMsg = false
    public errorMsg = false
    public counter1 = new BehaviorSubject<string>('0')
    public counter2 = new BehaviorSubject<string>('0')
    public counter3 = new BehaviorSubject<string>('0')
    public counter4 = new BehaviorSubject<string>('0')
    protected readonly Status = Status
    @ViewChild(IconStatusComponent) iconStatus: IconStatusComponent

    constructor(
        private reparationService: ReparationService,
        private contactService: ContactService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private viewportScroller: ViewportScroller,
    ) {
        this.form = this.formBuilder.group(
            {
                name: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
                address: ['', Validators.required],
                text: ['', Validators.required],
            },
            {
                updateOn: 'change',
            },
        )
    }

    public ngOnInit(): void {
        this.reparationUUID = this.route.snapshot.paramMap.get('uuid') ?? ''
        if (this.reparationUUID) {
            this.reparationService.getByUUID(this.reparationUUID).subscribe({
                next: res => {
                    this.reparation = res
                    console.log(res)
                },
                error: err => {
                    console.error(err)
                    /*this.toastService.show(getErrors(err.msg), 'Error', 'danger')*/
                },
            })
        }
        this.counterFunc(15, this.counter1)
        this.counterFunc(2500, this.counter2)
        this.counterFunc(99, this.counter3)
        this.counterFunc(127, this.counter4)
    }

    public changeStatus(id: any, status: Status) {
        this.reparationService.changeStatus(id, status).subscribe({
            next: res => {
                this.reparation.status = status
                this.ngOnInit()
            },
            error: err => {
                console.error(err)
                /*this.toastService.show(getErrors(err.msg), 'Error', 'danger')*/
            },
        })
    }

    public onContact() {
        this.exitoMsg = false
        this.errorMsg = false

        if (this.form.valid) {
            this.contactService.create(this.contactBody()).subscribe({
                next: () => {
                    this.exitoMsg = true
                    this.form.reset()
                },
                error: err => console.error(err),
            })
        } else {
            this.errorMsg = true
        }
    }

    public clientReport(clientReport: Report[] | undefined): Report | undefined {
        return clientReport ? clientReport[clientReport.length - 1] : undefined
    }

    public goToAnchor(elementId: string) {
        this.viewportScroller.scrollToAnchor(elementId)
    }

    private contactBody(): Contact {
        return {
            name: this.form.controls['name'].value,
            phone: this.form.controls['phone'].value,
            email: this.form.controls['email'].value,
            address: this.form.controls['address'].value,
            text: this.form.controls['text'].value,
        }
    }

    public counterFunc(number: number, counter: BehaviorSubject<string>) {
        let start = 0
        let end = parseInt(String(number).substring(0, 3))

        if (start === end) {
            return
        }

        // find duration per increment
        let totalMilSecDur = 3
        let incrementTime = (totalMilSecDur / end) * 1000

        let timer = setInterval(() => {
            start += 1
            counter.next(String(start) + number.toString().substring(3))
            //this.counter = String(start) + this.number.toString().substring(3);
            if (start === end) {
                clearInterval(timer)
            }
        }, incrementTime)
    }
}
