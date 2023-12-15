import { Component, Input } from '@angular/core'
import { Status } from '../../reparation/reparation.model'

@Component({
    selector: 'app-icon-status',
    templateUrl: './icon-status.component.html',
    styleUrls: ['./icon-status.component.scss'],
})
export class IconStatusComponent {
    @Input() status: Status
    protected readonly Status = Status
}
