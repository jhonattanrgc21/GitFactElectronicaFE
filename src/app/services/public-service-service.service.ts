import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PublicServiceServiceService {
  url = 'http://localhost:8080/sib/api';
  constructor(private http: HttpClient) { }

  getPublicServiceReceiptsByParams(accountNumber, cardNumber, dateFrom, dateTo, amountFrom, amountTo, publicServiceId) {
    const method = '/publicservice/findpublicservicereceiptbyparams';
    return this.http.post(
      this.url + method,
      JSON.stringify({
        'accountNumber': accountNumber, 'cardNumber': cardNumber, 'dateRangeMin': dateFrom, 'dateRangeMax': dateTo,
        'amountRangeMin': amountFrom, 'amountRangeMax': amountTo, 'publicServiceId': publicServiceId
      }),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

  getReceiptDetail(receiptId: number) {
    const method = '/publicservice/findpublicservicereceiptdetailstring';
    return this.http.post(
      this.url + method,
      JSON.stringify({'publicServiceReceiptId': receiptId}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

  getPublicServicesList() {
    const method = '/publicservice/findpublicservicelist';
    return this.http.post(
      this.url + method,
      JSON.stringify({}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

getStateBill(){
  const method = '/getstatebill';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getSaleCondition(){
  const method = '/getsalecondition';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getDocType(){
  const method = '/getdoctype';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}


getCartera(){
  const method = '/getcartera';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getPayMethod(){
  const method = '/getpaymethod';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}



getBillFilter(accountNumber) {
  const method = '/getbillfilter';
  return this.http.post(
    this.url + method,
    JSON.stringify({
      'numact': accountNumber, 'identification': null, 'date1': null, 'date2': null,
      'catera': null, 'state': null, 'medpay': null, 'salecondition': null, 'emidate': null, 'amount': null, 'amount2': null,
      'doctype': null,
    }),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}




}
