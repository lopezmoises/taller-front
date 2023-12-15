import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Toast } from 'bootstrap'
import { ToastService } from '../toast.service'

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    @ViewChild('myToast', { static: true }) toastEl: ElementRef
    public toast: any

    constructor(public toastService: ToastService) {}

    public ngOnInit() {
        if (this.toastEl) {
            this.toast = new Toast(this.toastEl.nativeElement, {})
            this.toast.show()
        }
    }

    remove() {
        this.toastService.clear()
    }
}
