import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgOptimizedImage } from '@angular/common'
import { WrapperModule } from './wrapper/wrapper.module'
import { CustomerModule } from './customer/customer.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptorService } from './auth/auth-interceptor.service'
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { ToastComponent } from './shared/toast/toast.component'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        WrapperModule,
        CustomerModule,
        AuthModule,
        UserModule,
        HttpClientModule,
        SpinnerComponent,
        ToastComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
