import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { URL_API } from '../helpers/app.api'
import { Session } from './session.model'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public authenticate(credentials: object): Observable<Session> {
        return this.http.post<Session>(
            `${URL_API}auth/login`,
            JSON.stringify(credentials),
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                }),
            },
        )
    }

    public refresh(): Observable<any> {
        return this.http.get(`${URL_API}refresh`)
    }

    public logout(): Observable<any> {
        return this.http.get(`${URL_API}logout`)
    }
}
