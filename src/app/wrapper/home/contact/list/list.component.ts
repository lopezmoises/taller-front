import { Component } from '@angular/core'
import { ContactService } from '../../../../web/contact.service'
import { Contact } from '../../../../web/contact.model'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    public contacts: Contact[] = []

    constructor(private contactService: ContactService) {}

    public ngOnInit() {
        this.contactService.getAll().subscribe({
            next: res => (this.contacts = res),
            error: err => console.error(err),
        })
    }
}
