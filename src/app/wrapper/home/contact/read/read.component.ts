import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ContactService } from '../../../../web/contact.service'
import { Contact } from '../../../../web/contact.model'

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
    public contactId: any
    public contact: Contact

    constructor(
        private route: ActivatedRoute,
        private contactService: ContactService,
    ) {}

    ngOnInit(): void {
        this.contactId = this.route.snapshot.paramMap.get('id')
        this.contactService.getById(this.contactId).subscribe({
            next: res => (this.contact = res),
            error: err => console.error(err),
        })
    }
}
