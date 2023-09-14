import { Component, OnInit, Renderer2 } from '@angular/core'
import { Router } from '@angular/router'
import { StorageService } from '../auth/storage.service'
import { AuthService } from '../auth/auth.service'
import { User } from '../user/user.model'

@Component({
    selector: 'app-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
    public user: User = {}

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private storageService: StorageService,
    ) {}

    public ngOnInit(): void {
        this.user = this.storageService.getCurrentUser() ?? {}
    }

    public isActive(module: string): boolean {
        return this.router.url.includes(`/${module}`)
    }

    public exit() {
        this.storageService.logout()
    }

    public toggleSidebar() {
        const previousState = localStorage.getItem('taller-sidebar')

        if (previousState === 'sidenav-toggled') {
            this.renderer.removeClass(document.body, previousState)
            localStorage.removeItem('taller-sidebar')
        } else {
            this.renderer.addClass(document.body, 'sidenav-toggled')
            localStorage.setItem('taller-sidebar', 'sidenav-toggled')
        }
    }
}
