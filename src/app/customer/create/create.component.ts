import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { ToastService } from '../../shared/toast.service'
import { Customer } from '../customer.model'
import { CustomValidators } from '../../helpers/CustomValidators'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
    public form: FormGroup

    constructor(
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
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

        console.log('AAAAAAAAAA')
    }

    public onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched()
        } else {
            this.customerService.update(this.customerBody()).subscribe({
                next: res => {
                    this.form.reset()
                    this.toastService.show(`El cliente ${res.name} fue creado.`, 'Exito', 'success')
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
            name: this.form.controls['name'].value,
            document: this.form.controls['document'].value,
            phone: this.form.controls['phone'].value,
            email: this.form.controls['email'].value,
            address: this.form.controls['address'].value,
        }
    }
}
