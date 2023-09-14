import { Component, OnInit } from '@angular/core'
import { CustomerService } from '../customer.service'
import { Customer } from '../customer.model'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    public customers: Customer[] = []

    constructor(private customerService: CustomerService) {}

    public ngOnInit() {
        this.customerService.getAll().subscribe({
            next: res => {
                this.customers = res
            },
            error: err => console.error(err),
        })
    }

    public onDelete(id: number) {
        this.customerService.delete(id).subscribe({
            next: () => alert('OK'),
            error: err => console.error(err),
        })
    }
}
