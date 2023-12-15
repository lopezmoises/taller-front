import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { StorageService } from '../storage.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public form: FormGroup = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    })

    constructor(
        private authService: AuthService,
        private router: Router,
        private storageService: StorageService,
    ) {}

    public login(): void {
        if (this.form.status === 'INVALID') {
            this.form.markAllAsTouched()
        } else {
            const credentials = {
                username: this.form.value.username,
                password: this.form.value.password,
            }

            this.authService.authenticate(credentials).subscribe({
                next: res => {
                    console.log(res)
                    this.storageService.setSession(res)
                    this.router.navigate([''])
                },
                error: err => console.log(err),
            })
        }
    }
}
