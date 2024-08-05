import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillReportsService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBillFilter(
    consecutiveNumber,
    identification,
    dateFrom,
    dateTo,
  ) {
    const method = "/getbillreports";
    return this.http.post(
      this.url + method,
      JSON.stringify({
        consecutive: consecutiveNumber,
        identification: identification,
        startDate: dateFrom,
        endDate: dateTo,
      }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }
}

