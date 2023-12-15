import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Reparation, Status } from './reparation.model'
import { URL_API } from '../helpers/app.api'

@Injectable({
    providedIn: 'root',
})
export class ReparationService {
    constructor(private http: HttpClient) {}

    public getAll(): Observable<Reparation[]> {
        return this.http.get<Reparation[]>(`${URL_API}reparation`)
    }

    public getAllByStatus(status: Status): Observable<Reparation[]> {
        return this.http.get<Reparation[]>(`${URL_API}reparation/status/${status}`)
    }

    public countAllByStatus(status: Status): Observable<number> {
        return this.http.get<number>(`${URL_API}reparation/status/count/${status}`)
    }

    public countAllStatus(): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${URL_API}reparation/status/count`)
    }

    public getAllByDelivered(): Observable<Reparation[]> {
        return this.http.get<Reparation[]>(`${URL_API}reparation/delivered`)
    }

    public countAllByDelivered(): Observable<number> {
        return this.http.get<number>(`${URL_API}reparation/delivered/count`)
    }

    public getQuantityProntas(): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${URL_API}reparation/quantity-prontas`)
    }

    public search(filter: string): Observable<Reparation[]> {
        return this.http.get<Reparation[]>(`${URL_API}reparation/search/${filter}`)
    }

    public getById(id: string): Observable<Reparation> {
        return this.http.get<Reparation>(`${URL_API}reparation/${id}`)
    }

    public getByUUID(uuid: string): Observable<Reparation> {
        return this.http.get<Reparation>(`${URL_API}reparation/uuid/${uuid}`)
    }

    public create(reparation: Reparation): Observable<Reparation> {
        return this.http.post<Reparation>(`${URL_API}reparation`, reparation)
    }

    public update(id: string, reparation: Reparation): Observable<any> {
        return this.http.patch(`${URL_API}reparation/${id}`, reparation)
    }

    public deliver(id: string): Observable<any> {
        return this.http.patch(`${URL_API}reparation/deliver/${id}`, {})
    }

    public changeStatus(id: string, status: Status): Observable<any> {
        return this.http.patch(`${URL_API}reparation/change-status/${id}/${status}`, {})
    }
}
