import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { StorageService } from './storage.service'
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'
import { catchError, finalize, Observable, throwError } from 'rxjs'
import { LoaderService } from '../shared/loader.service'

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService {
    constructor(
        private router: Router,
        private storage: StorageService,
        private loader: LoaderService,
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.loader.show()
        const token = this.storage.getCompleteToken()
        let request = req
        if (token) {
            request = req.clone({
                setHeaders: {
                    Accept: 'application/json',
                    authorization: `${token}`,
                },
            })
        }

        return next.handle(request).pipe(
            catchError(error => {
                let errorMessage: any
                if (error.status === 401) {
                    this.router.navigateByUrl('login')
                }

                if (error.error instanceof Error) {
                    errorMessage = error.error.message
                } else {
                    errorMessage = {
                        code: error.status,
                        msg: error.error.errors
                            ? error.error.errors
                            : error.statusText,
                    }
                }
                return throwError(errorMessage)
            }),
            finalize(() => {
                this.loader.hide()
            }),
        )
    }
}
