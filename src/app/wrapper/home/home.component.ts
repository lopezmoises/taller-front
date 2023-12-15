import { Component, OnInit } from '@angular/core'
import { ReparationService } from '../../reparation/reparation.service'
import { Status } from '../../reparation/reparation.model'
import { ContactService } from '../../web/contact.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public aceptadas: number
    public prontas: number
    public enTaller: number
    public contacts: number
    public labelsPie: string[]
    public valuesPie: number[]
    public labelsBar: string[]
    public valuesBar: number[]

    constructor(
        private reparationService: ReparationService,
        private contactService: ContactService,
    ) {}

    public ngOnInit(): void {
        this.getAceptadas()
        this.getProntas()
        this.getEnTaller()
        this.getContacts()
        this.getAllStatus()
        this.getQuantityProntas()
    }

    private getAceptadas() {
        this.reparationService.countAllByStatus(Status.ACEPTADO).subscribe({
            next: res => (this.aceptadas = res),
            error: err => console.error(err),
        })
    }

    private getProntas() {
        this.reparationService.countAllByStatus(Status.PRONTO).subscribe({
            next: res => (this.prontas = res),
            error: err => console.error(err),
        })
    }

    private getEnTaller() {
        this.reparationService.countAllByDelivered().subscribe({
            next: res => (this.enTaller = res),
            error: err => console.error(err),
        })
    }

    private getContacts() {
        this.contactService.countAll().subscribe({
            next: res => (this.contacts = res),
            error: err => console.error(err),
        })
    }

    private getAllStatus() {
        this.reparationService.countAllStatus().subscribe({
            next: res => {
                this.labelsPie = Object.keys(res)
                this.valuesPie = Object.values(res)
            },
            error: err => console.error(err),
        })
    }

    public getQuantityProntas() {
        this.reparationService.getQuantityProntas().subscribe({
            next: res => {
                this.labelsBar = Object.keys(res)
                this.valuesBar = Object.values(res)
            },
            error: err => console.error(err),
        })
    }
}
