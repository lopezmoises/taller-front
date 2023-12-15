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
import { ReparationModule } from './reparation/reparation.module'
import { WebModule } from './web/web.module'

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
        CustomerModule,
        ReparationModule,
        HttpClientModule,
        SpinnerComponent,
        ToastComponent,
        WebModule,
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
