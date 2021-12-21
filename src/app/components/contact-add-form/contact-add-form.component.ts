import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactAddService } from './contact-add.service';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.scss']
})
export class ContactAddFormComponent implements OnInit {
  // its used like document.getElementById(), its helps to target dom in angular html
  // target to chnage color othe add contact button when contact input field is not empty
  @ViewChild("addButton") addButton: ElementRef;
  // this is parameter recieveing form parent to send valaue form this component
  @Output() getAllContacts: EventEmitter<any> = new EventEmitter();

  constructor(public addButton2: ElementRef, public contactAddService:ContactAddService) {this.addButton=addButton2 }

  // reactive form group is initialized here to get value from input field
  addContactform = new FormGroup({
    newContact: new FormControl("")
  })

  ngOnInit(): void {
  }
  // changeFormElement is taking input form field as keyup and once there is more that data > 1
  // the add contact button is highlited
  // if again field is empty then the color will be reset
  cFormElement(field:any){
    if(field.value.length > 0 ) {
      this.addButton
      .nativeElement
      .style
      .backgroundColor = "#ffffff";
    }else{
      this.addButton
      .nativeElement
      .style
      .backgroundColor = "#E0E0E0";
    }
  }

  // addContact is having data by fromGroup and sending to service
  // servicng taking the value as parameter and seding to api to store as contact
  // emit() is here to recall contactlist and load
  addContact () {
    this.contactAddService.addToContactList(this.addContactform.value.newContact)
    .subscribe(()=>{
      this.getAllContacts.emit();
    })
  }

}
