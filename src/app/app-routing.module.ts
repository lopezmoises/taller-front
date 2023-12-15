import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WrapperComponent } from './wrapper/wrapper.component'
import { CreateComponent as CreateCustomer } from './customer/create/create.component'
import { ListComponent as ListCustomer } from './customer/list/list.component'
import { UpdateComponent as UpdateCustomer } from './customer/update/update.component'
import { CreateComponent as CreateReparation } from './reparation/create/create.component'
import { ListComponent as ListReparation } from './reparation/list/list.component'
import { ReadComponent as ReadReparation } from './reparation/read/read.component'
import { ReadComponent as ReadContact } from './wrapper/home/contact/read/read.component'
import { ListComponent as ListContact } from './wrapper/home/contact/list/list.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'
import { WebComponent } from './web/web.component'
import { HomeComponent } from './wrapper/home/home.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'web/:uuid',
        component: WebComponent,
    },
    {
        path: 'web',
        component: WebComponent,
    },
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'customer/create',
                component: CreateCustomer,
            },
            {
                path: 'customer/list',
                component: ListCustomer,
            },
            {
                path: 'customer/update/:id',
                component: UpdateCustomer,
            },
            {
                path: 'reparation/create',
                component: CreateReparation,
            },
            {
                path: 'reparation/list',
                component: ListReparation,
            },
            {
                path: 'reparation/list/:listType',
                component: ListReparation,
            },
            {
                path: 'reparation/read/:id',
                component: ReadReparation,
            },
            {
                path: 'contact/list',
                component: ListContact,
            },
            {
                path: 'contact/read/:id',
                component: ReadContact,
            },
        ],
        canActivate: [AuthGuard],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
