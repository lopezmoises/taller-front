import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { ActivatedRoute } from '@angular/router'
import { Customer } from '../customer.model'
import { ToastService } from '../../shared/toast.service'
import { CustomValidators } from '../../helpers/CustomValidators'

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

    }

    public ngOnInit(): void {
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
            this.customerService.update(this.customerBody()).subscribe({
                next: res => {
                    this.form.reset()
                    this.toastService.show(`El cliente ${res.name} fue actualizado.`, 'Exito', 'success')
                    this.ngOnInit()
                },
                error: err => {
                    console.error(err)
                    this.toastService.show(err.msg, 'Error', 'danger')
                },
            })
        }
    }

    public inputIsValid(input: string, form: FormGroup): boolean {
        return !(form.get(input)?.invalid && form.get(input)?.touched)
    }

    private customerBody(): Customer {
        return {
            id: Number(this.customerId),
            name: this.form.controls['name'].value,
            document: this.form.controls['document'].value,
            phone: this.form.controls['phone'].value,
            email: this.form.controls['email'].value,
            address: this.form.controls['address'].value,
        }
    }
}
