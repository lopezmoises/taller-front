import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts: ToastInfo[] = []

    show(body?: string, header?: string, style?: string, delay?: number) {
        this.toasts.push({ header, body, style, delay })
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast)
    }

    clear() {
        this.toasts.splice(0, this.toasts.length)
    }
}

export interface ToastInfo {
    header?: string
    body?: string
    delay?: number
    style?: string
}
