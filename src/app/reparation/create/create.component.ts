import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ToastService } from '../../shared/toast.service'
import { ReparationService } from '../reparation.service'
import { Reparation, Status } from '../reparation.model'
import { CustomValidators } from '../../helpers/CustomValidators'
import { StorageService } from '../../auth/storage.service'
import { CustomerService } from '../../customer/customer.service'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
    public customerStep = true
    public deviceStep = false
    public reparationStep = false
    public budgeted = false
    public formCustomer: FormGroup
    public formDevice: FormGroup
    public formReparation: FormGroup
    public reparationBody: Reparation = { status: Status.RECIBIDO }
    private customerId: number

    constructor(
        private reparationService: ReparationService,
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public toastService: ToastService,
        public storageService: StorageService,
    ) {
        this.formCustomer = formBuilder.group(
            {
                name: ['', Validators.required],
                document: ['', [Validators.required, CustomValidators.validateDocument]],
                phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
                email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
                address: ['', [Validators.required]],
            },
            {
                updateOn: 'change',
            },
        )

        this.formDevice = formBuilder.group(
            {
                serialNumber: ['', Validators.required],
                brand: ['', Validators.required],
                model: ['', [Validators.required]],
                type: ['', [Validators.required]],
            },
            {
                updateOn: 'change',
            },
        )

        this.formReparation = formBuilder.group(
            {
                problem: ['', Validators.required],
                status: [Status.RECIBIDO],
                clientReport: [null],
                techReport: [null],
                budget: [0],
            },
            {
                updateOn: 'change',
            },
        )
    }

    public onNext(step: string) {
        if (step === 'DEVICE') {
            if (this.formCustomer.valid) {
                this.changeStep(step)
                this.reparationBody.customer = {
                    id: this.customerId ?? null,
                    name: this.formCustomer.controls['name'].value,
                    document: this.formCustomer.controls['document'].value,
                    phone: this.formCustomer.controls['phone'].value,
                    email: this.formCustomer.controls['email'].value,
                    address: this.formCustomer.controls['address'].value,
                }
            } else {
                this.formCustomer.markAllAsTouched()
            }
        } else {
            if (this.formDevice.valid) {
                this.changeStep(step)
                this.reparationBody.device = {
                    serialNumber: this.formDevice.controls['serialNumber'].value,
                    brand: this.formDevice.controls['brand'].value,
                    model: this.formDevice.controls['model'].value,
                    type: this.formDevice.controls['type'].value,
                }
            } else {
                this.formDevice.markAllAsTouched()
            }
        }
    }

    public onSave() {
        if (this.formReparation.valid) {
            this.reparationBody.problem = this.formReparation.controls['problem'].value
            this.reparationBody.status = this.formReparation.controls['status'].value
            this.reparationBody.clientReport = this.formReparation.controls['clientReport'].value
            this.reparationBody.techReport = this.formReparation.controls['techReport'].value
            this.reparationBody.budget = this.formReparation.controls['budget'].value
            this.reparationBody.receiver = this.storageService.getCurrentUser()

            this.reparationService.create(this.reparationBody).subscribe({
                next: res => {
                    console.log(res)
                    this.toastService.show('Éxito')
                    this.changeStep('CUSTOMER')
                    this.resetForms()
                },
                error: err => {
                    console.error(err)
                    this.toastService.show(err.msg, 'Error', 'danger')
                },
            })
        } else {
            this.formReparation.markAllAsTouched()
        }
    }

    private changeStep(step: string) {
        this.customerStep = step === 'CUSTOMER'
        this.deviceStep = step === 'DEVICE'
        this.reparationStep = step === 'REPARATION'
    }

    public inputIsValid(input: string, form: FormGroup): boolean {
        return !(form.get(input)?.invalid && form.get(input)?.touched)
    }

    public onChangeStatus() {
        this.budgeted = this.formReparation.controls['status'].value === Status.PRESUPUESTADO
        this.formReparation.controls['clientReport'].reset()
        this.formReparation.controls['techReport'].reset()
        this.formReparation.controls['budget'].reset()

        if (this.budgeted) {
            this.formReparation.controls['clientReport'].addValidators(Validators.required)
            this.formReparation.controls['techReport'].addValidators(Validators.required)
            this.formReparation.controls['budget'].addValidators([Validators.required, Validators.pattern('^[0-9]*$')])
        } else {
            this.formReparation.controls['clientReport'].clearValidators()
            this.formReparation.controls['techReport'].clearValidators()
            this.formReparation.controls['budget'].clearValidators()
        }
    }

    private resetForms() {
        this.formReparation.reset()
        this.formCustomer.reset()
        this.formDevice.reset()
    }

    public findCustomer() {
        console.log(this.formCustomer.controls['document'].status)
        if (this.formCustomer.controls['document'].valid) {
            this.customerService.getByDocument(this.formCustomer.controls['document'].value).subscribe({
                next: res => {
                    if (res) {
                        this.formCustomer.patchValue(res)
                        this.customerId = Number(res.id)
                        console.log(res)
                    }
                },
                error: err => console.error(err),
            })
        }
    }
}
