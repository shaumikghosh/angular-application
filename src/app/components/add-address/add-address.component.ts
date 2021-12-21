import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/views/contacts/contact.service';
import { AddressService } from './address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  // adress id reciving as a parameter from conact list component
  // to get specifc addreess by id matching
  @Input() relatedAddressId!: number

  // passing parameter child to parent to retrive contact list once action done
  @Output() getBackToContactList:EventEmitter<any> = new EventEmitter();

  // initialized the address state 
  public addressComponent: any = {
    countries: [],
    formSize: [1],
    addresses: [],
    contact: []
  }

  // initialized conatct service with constructor
  constructor(public addressService: AddressService,
    public contactService: ContactService) { }

  ngOnInit(): void {
    // reciving country list from service to display country list in the address field fropdown list
    this.addressService.getCountries()
      .subscribe((response) => {
        this.addressComponent.countries = response
      });

      // retriving addresses from service to perform a loop of address fields in angular address form
    this.addressService.getAdresses(this.relatedAddressId)
      .subscribe((response) => {
        this.addressComponent.addresses = response;
      })
      // this related address id will call contact info by id number associated with address
    this.contactService.getContact(this.relatedAddressId)
      .subscribe((response) => {
        this.addressComponent.contact = response;
      })
  }

  // form number one if no preexist address availlabale then this form will be in use
  addForm() {
    let form = this.addressComponent.formSize.length + 1;
    this.addressComponent.formSize.push(form);
  }

  // if there is preexisted adress list then this form will be in use
  addForm2(){
    // its virtual field id which will hep to set temporary id to a field
    let r = (Math.random() + 1).toString(36).substring(7);
    this.addressComponent.addresses.push({street1:"", id: r});
  }

  // when form has no predefined adresses listed then it will help to remove fields
  // when user add more fields in the form
  removeForm(formNumber: number) {
    let arr = this.addressComponent.formSize.filter(function (item: any) {
      return item !== formNumber;
    })
    this.addressComponent.formSize.length = 0;
    for (let i = 0; i < arr.length; i++) {
      this.addressComponent.formSize.push(arr[i]);
    }
  }

  // getting dynamic data with multiple field from angular templated driven from
  addNewAddress(data: any, id:any) {
    let formdata: any = [];
    // according to the formSize it will iterate number and get dynamic data from address form
    // and initialize to formdata array
    for (let i in this.addressComponent.formSize) {
      formdata.push({
        street1: data[`street1_${this.addressComponent.formSize[i]}`],
        street2: data[`street2_${this.addressComponent.formSize[i]}`],
        town: data[`town_${this.addressComponent.formSize[i]}`],
        country: data[`country_${this.addressComponent.formSize[i]}`],
      });
    }
    // once array initializing is done then it will make a pbject list of the address data as array of object
    formdata.forEach((element:any) => {
      let address = {
        street1: element['street1'],
        street2: element['street2'],
        town: element['town'],
        country: element['country'],
        contactId: id
      }
      // once array object is ready then it will send request to service 
      // to provide data address  and save it db
      this.addressService.addAddressToDb(address).subscribe();
    });
    // it will recall the contact list in the view
    this.getBackToContactList.emit();
  }

  // update address will  work same as add data function just there is two different logic binded
  // each dynamic field has temporary id number, the temporary id number helps program to detect feild if anytime need to remove from field list
  updateAddress (data:any, id:any) {
    let formdata: any = [];
    for (let i in this.addressComponent.addresses) {
      formdata.push({
        addressId: data[`addressId_${i}`],
        street1: data[`street1_${i}`],
        street2: data[`street2_${i}`],
        town: data[`town_${i}`],
        country: data[`country_${i}`],
        contactId: id
      });
    }
    formdata.forEach((element:any) => {
      // id id is number then detect that its a data which is requested to update
      if(!isNaN(element["addressId"])){
        let addressId = parseInt(element['addressId']);
        let address = {
          street1: element['street1'],
          street2: element['street2'],
          town: element['town'],
          country: element['country'],
          contactId: id
        }
        this.addressService.updateAddress(address, addressId).subscribe();
      }
      // if the id is not a number this mean the data is addedd newly and requested to insert in db
      // once update action is done
      if(isNaN(element["addressId"])){
        let address = {
          id: parseInt(element['addressId']),
          street1: element['street1'],
          street2: element['street2'],
          town: element['town'],
          country: element['country'],
          contactId: id
        }
        this.addressService.addAddressToDb(address).subscribe();
      }
      // it will call the conatc list in the view
      this.getBackToContactList.emit();
    });
  }

  // request for remove item from the list with different lof
  removeItem(id:any){
    let arr = this.addressComponent.addresses.filter(function (item: any) {
      return item.id !== id;
    })
    this.addressComponent.addresses.length = 0;
    for (let i = 0; i < arr.length; i++) {
      this.addressComponent.addresses.push(arr[i]);
    }
    // only request service to comunicate api to remove the addree
    // if the id is number that means its a remove request
    // else it will remove field from dom in angular
    if(!isNaN(id)) {
      this.addressService.deleteAddress(id).subscribe();
    }
  }

}
