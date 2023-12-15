import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Customer } from './customer.model'
import { URL_API } from '../helpers/app.api'

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    public getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${URL_API}customer`)
    }

    public getById(id: string): Observable<Customer> {
        return this.http.get<Customer>(`${URL_API}customer/${id}`)
    }

    public getByDocument(document: string): Observable<Customer> {
        return this.http.get<Customer>(`${URL_API}customer/document/${document}`)
    }

    public create(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${URL_API}customer`, customer)
    }

    public update(customer: Customer): Observable<any> {
        return this.http.put(`${URL_API}customer`, customer)
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`${URL_API}customer/${id}`)
    }
}
