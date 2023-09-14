import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WrapperComponent } from './wrapper/wrapper.component'
import { CreateComponent as CreateCustomer } from './customer/create/create.component'
import { ListComponent as ListCustomer } from './customer/list/list.component'
import { ReadComponent as ReadCustomer } from './customer/read/read.component'
import { UpdateComponent as UpdateCustomer } from './customer/update/update.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: 'customer/create',
                component: CreateCustomer,
            },
            {
                path: 'customer/list',
                component: ListCustomer,
            },
            {
                path: 'customer/read/:id',
                component: ReadCustomer,
            },
            {
                path: 'customer/update/:id',
                component: UpdateCustomer,
            },
        ],
        canActivate: [AuthGuard],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
