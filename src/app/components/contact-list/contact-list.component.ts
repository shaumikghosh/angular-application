import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Output() updateFormtStatus:EventEmitter<any> = new EventEmitter();
  // @Output() getContactAddresses:EventEmitter<any> = new EventEmitter();

  // this paramter is coming from contacts view and displayed in the contactlist component
  @Input() fullName!: string;
  @Input() avatar!:string;
  @Input() id!:number;

  constructor() { }

  ngOnInit(): void {
    
  }
  // to display contact full_name, avatar its required to get the contact id
  // this id is bening send to contact components to retrive contact data with id
  contactInfo(userId:any){
    this.updateFormtStatus.emit(userId);
  }
}
