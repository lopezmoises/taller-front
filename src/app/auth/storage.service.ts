import { Injectable } from '@angular/core'
import { Session } from './session.model'
import { Router } from '@angular/router'
import { User } from '../user/user.model'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private localStorage: Storage
    private currentSession: Session | null

    constructor(private router: Router) {
        this.localStorage = localStorage
        this.currentSession = this.loadSessionData()
        this.verifyToken()
    }

    public setSession(session: Session): void {
        this.currentSession = session
        this.localStorage.setItem('currentUser', JSON.stringify(session))
    }

    public getSession(): Session | null {
        return this.currentSession
    }

    public getCurrentUser(): User | null {
        const session: Session | null = this.getSession()
        return session && session.user ? session.user : null
    }

    public isAuthenticated(): boolean {
        return this.getToken() != null
    }

    public getToken(): string | null {
        const session = this.getSession()
        return session && session.token ? session.token : null
    }

    public getCompleteToken(): string | null {
        this.verifyToken()
        const session = this.getSession()
        return session && session.token ? `Bearer ${session.token}` : null
    }

    public logout(): void {
        this.removeSession()
        this.router.navigate(['/login'])
    }

    private loadSessionData(): Session | null {
        const sessionStr = this.localStorage.getItem('currentUser')
        return sessionStr ? <Session>JSON.parse(sessionStr) : null
    }

    private removeSession(): void {
        this.localStorage.removeItem('currentUser')
        this.currentSession = null
    }

    private verifyToken(): void {
        if (this.currentSession) {
            const date = Math.round(+new Date() / 1000)
            if (
                this.isAuthenticated() &&
                this.currentSession.expiration < date
            ) {
                this.logout()
            }
        }
    }
}
