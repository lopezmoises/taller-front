import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateComponent } from './create/create.component'
import { UpdateComponent } from './update/update.component'
import { ListComponent } from './list/list.component'
import { RouterLink } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateComponent, UpdateComponent, ListComponent],
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    exports: [CreateComponent, UpdateComponent, ListComponent],
})
export class CustomerModule {}
