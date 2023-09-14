import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateComponent } from './create/create.component'
import { UpdateComponent } from './update/update.component'
import { ReadComponent } from './read/read.component'
import { ListComponent } from './list/list.component'
import { RouterLink } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        CreateComponent,
        UpdateComponent,
        ReadComponent,
        ListComponent,
    ],
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    exports: [CreateComponent, ReadComponent, UpdateComponent, ListComponent],
})
export class CustomerModule {}
