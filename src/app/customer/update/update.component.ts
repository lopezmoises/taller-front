import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { ActivatedRoute } from '@angular/router'
import { Customer } from '../customer.model'
import { ToastService } from '../../shared/toast.service'

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
    public form: FormGroup
    private customerId: string

    constructor(
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public toastService: ToastService,
    ) {
        this.form = formBuilder.group(
            {
                name: [{ value: null, disabled: true }],
                document: [{ value: null, disabled: true }],
                phone: ['', [Validators.required]],
                email: ['', [Validators.email]],
                address: ['', [Validators.required]],
            },
            {
                updateOn: 'change',
            },
        )
    }

    public ngOnInit(): void {
        this.toastService.show('TEST')
        this.customerId = this.route.snapshot.paramMap.get('id') ?? ''
        this.customerService.getById(this.customerId).subscribe({
            next: res => {
                this.form.patchValue({
                    name: res.name,
                    document: res.document,
                    phone: res.phone,
                    email: res.email,
                    address: res.address,
                })
            },
            error: err => {
                console.error(err)
                /*this.toastService.show(getErrors(err.msg), 'Error', 'danger')*/
            },
        })
    }

    public onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched()
        } else {
            this.customerService
                .update(this.customerId, this.customerBody())
                .subscribe({
                    next: res => {
                        this.form.reset()
                        /*this.toastService.show(
                            `El cliente ${res.businessName} fue actualizado.`,
                            'Exito',
                            'success',
                        )*/
                        this.ngOnInit()
                    },
                    error: err => {
                        console.error(err)
                        /*this.toastService.show(
                            getErrors(err.msg),
                            'Error',
                            'danger',
                        )*/
                    },
                })
        }
    }

    private customerBody(): Customer {
        return {
            name: this.form.controls['name'].value,
            document: this.form.controls['document'].value,
            phone: this.form.controls['phone'].value,
            email: this.form.controls['email'].value,
            address: this.form.controls['address'].value,
        }
    }
}
