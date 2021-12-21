import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  // contact state data initialized
  public contactState:any = {
    addAddress:false,
    contactList: [],
    totalContacts: 0,
    relatedAddressId: null
  };

  // constructor is loding data of contact list component at the first load of app
  // constructor is also initialized for contact service
  // all the api call request is requested form service file
  constructor(public contactService:ContactService) { 
    this.getAllContacts();
  }

  ngOnInit(): void {
    
  }

  // get request for contacts api has been initalized here
  // so that its become easy to call to load data anywhere
  getAllContacts () {
    // returning data from service of contacts get api
    this.contactService.getContacts().subscribe((response) => {
      this.contactState.contactList = response; // initialized response to contactlist state
      // counting length of contact to display how many contacts available in list
      this.contactState.totalContacts = this.contactState.contactList.length;
    })
  }

  // its coming form contact list componenet to change contact state
  // it will help to hide / show address form 
  updateFormtStatus (id:number) {
    // when add / update address fiesl will show 
    // this id will help to find related data with contact with address
    this.contactState.relatedAddressId = id;
    this.contactState.addAddress = true;
  }

  // recalling the contact list in view and hide address field
  getBackToContactList () {
    this.contactState.addAddress = false;
  }

}
