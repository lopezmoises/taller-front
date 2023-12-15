import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { URL_API } from '../helpers/app.api'
import { Contact } from './contact.model'

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    constructor(private http: HttpClient) {}

    public getAll(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${URL_API}contact`)
    }

    public countAll(): Observable<number> {
        return this.http.get<number>(`${URL_API}contact/count`)
    }

    public getById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${URL_API}contact/${id}`)
    }

    public create(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(`${URL_API}contact`, contact)
    }

    public visualize(id: string): Observable<any> {
        return this.http.put(`${URL_API}contact/${id}`, {})
    }
}
