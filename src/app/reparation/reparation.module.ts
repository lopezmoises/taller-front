import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { CreateComponent } from './create/create.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ListComponent } from './list/list.component'
import { RouterLink } from '@angular/router'
import { ReadComponent } from './read/read.component'

@NgModule({
    declarations: [CreateComponent, ListComponent, ReadComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    exports: [CreateComponent, ListComponent],
    providers: [DatePipe],
})
export class ReparationModule {}
