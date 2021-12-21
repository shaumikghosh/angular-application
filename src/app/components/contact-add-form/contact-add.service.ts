import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ContactAddService {

  // httpclient helps angular application to comunicate with api
  constructor(public http:HttpClient) { }

  // its sending request to api to store the data as contact in db list
  // base_url() ios coimng from main.ts file
  addToContactList (data:string) {
    return this.http.post(base_url()+"/contacts", {
      "full_name": data,
      "avatar": ""
    });
  }
}
