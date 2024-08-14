import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiversService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReceiversFilter(
    accountNumber,
    identification,
    establishmentNumber,
  ) {
    const method = "/getallreceivers";
    return this.http.post(
      this.url + method,
      JSON.stringify({
        accountNumber,
        identification,
        establishmentNumber,
      }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }
}
