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
  alert(billDate);
    const method = '/checkStatus';
    alert(this.url + method);
    return this.http.post(
      this.url + method,
      JSON.stringify({'bill_date':billDate}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }
}