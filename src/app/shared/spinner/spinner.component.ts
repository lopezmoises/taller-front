import { Component } from '@angular/core'
import { LoaderService } from '../loader.service'
import { CommonModule } from '@angular/common'

@Component({
    standalone: true,
    selector: 'app-spinner',
    imports: [CommonModule],
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    loading$ = this.loader.loading$

    constructor(public loader: LoaderService) {}
}
