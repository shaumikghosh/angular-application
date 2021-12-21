import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  // initialized httpclient to communicate json server api
  constructor(private http: HttpClient) { }

  // sending request to return all country list 
  getCountries () {
    return this.http.get(base_url()+"/countries");
  }

  // sending request to return all address list by its contact id
  // its need to be contact id because its relational with address
  // contact table has id and address table has contactId
  // to get data bosth should be same
  getAdresses (id:any) {
    return this.http.get(base_url()+"/addresses/?contactId="+id);
  }

  // request to api to store new address for contact in db
  addAddressToDb(data:any) {
    return this.http.post(base_url()+"/addresses/", data);
  }

  // request to update address field where id will be same to request id
  updateAddress(data:any, addressId:any) {
    return this.http.put(base_url()+"/addresses/"+addressId, data);
  }

  // sending delete request to remove specific address from database
  deleteAddress (addressId:any) {
    return this.http.delete(base_url()+"/addresses/"+addressId);
  }
}
