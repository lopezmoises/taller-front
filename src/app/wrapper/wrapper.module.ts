import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WrapperComponent } from './wrapper.component'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

@NgModule({
    declarations: [WrapperComponent],
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    exports: [WrapperComponent],
})
export class WrapperModule {}
