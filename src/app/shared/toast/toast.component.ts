import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Toast } from 'bootstrap'

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    @Input() msg: string

    @ViewChild('myToast', { static: true }) toastEl: ElementRef
    public toast: any

    public ngOnInit() {
        this.toast = new Toast(this.toastEl.nativeElement, {})
        this.toast.show()
    }
}
