import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WrapperComponent } from './wrapper.component'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './home/contact/list/list.component';
import { ReadComponent } from './home/contact/read/read.component'
import { FormsModule } from '@angular/forms';
import { ChartPieComponent } from './home/charts/chart-pie/chart-pie.component';
import { ChartBarComponent } from './home/charts/chart-bar/chart-bar.component'

@NgModule({
    declarations: [WrapperComponent, HomeComponent, ListComponent, ReadComponent, ChartPieComponent, ChartBarComponent],
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
    exports: [WrapperComponent],
})
export class WrapperModule {}
