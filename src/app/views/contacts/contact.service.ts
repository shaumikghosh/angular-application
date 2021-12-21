import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts () {
    return this.http.get(base_url()+"/contacts");
  }

  getContact (id:any) {
    return this.http.get(base_url()+"/contacts/"+id);
  }
}
