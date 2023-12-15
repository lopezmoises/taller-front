import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebComponent } from './web.component'
import { IconStatusComponent } from './icon-status/icon-status.component'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [WebComponent, IconStatusComponent],
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class WebModule {}
