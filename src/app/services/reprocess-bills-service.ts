import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReprocessBillSService {
  url = environment.apiUrl;
  nmtId=environment.defaultNmtId;
  pmnId=environment.defaultPmnId;
  constructor(private http: HttpClient) { }


updateBillS(billDate) {
    const method = "/getsendxmlbill";
    return this.http.post(
      this.url + method,
      JSON.stringify({dateclose:billDate}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }
}
