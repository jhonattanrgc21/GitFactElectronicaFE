import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { PublicServiceReceiptDetailModalComponent } from '../public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component';
import { MatConfirmComponent } from '../mat-confirm/mat-confirm.component';
@Injectable({
  providedIn: 'root'
})
export class PublicServiceServiceService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getPublicServiceReceiptsByParams(consecutiveNumber,accountNumber,identification, dateFrom, dateTo, amountFrom, amountTo, stateId, paymethodId,saleconditionId,carteraId,doctypeId) {
    const method = '/getbillfilter';
    return this.http.post(
      this.url + method,
      JSON.stringify({
        'numact': accountNumber, 'identification': identification, 'date1': dateFrom, 'date2': dateTo,
        'catera': carteraId, 'state': stateId, 'medpay': paymethodId, 'salecondition': saleconditionId, 'amount': amountFrom, 'amount2': amountTo, 'doctype': doctypeId,
        'connum':consecutiveNumber
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


  sendBillPDF(consecutiveNumber) {
    const method = '/getbillbyconsecutive';
    return this.http.post(
      this.url + method,
      JSON.stringify({'consecutiveNumber': consecutiveNumber}),
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



getBillFilter(consecutiveNumber,accountNumber,identification, dateFrom, dateTo, amountFrom, amountTo, stateId, paymethodId,saleconditionId,carteraId,doctypeId) {
  const method = '/getbillfilter';
  return this.http.post(
    this.url + method,
    JSON.stringify({
      'numact': accountNumber, 'identification': identification, 'date1': dateFrom, 'date2': dateTo,
      'catera': carteraId, 'state': stateId, 'medpay': paymethodId, 'salecondition': saleconditionId, 'amount': amountFrom, 'amount2': amountTo, 'doctype': doctypeId,
      'connum': consecutiveNumber
    }),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getPDF(consecutiveNumber) {
    const method = '/pdfBill';
    return this.http.post(
      this.url + method,
      JSON.stringify({'consecutiveNumber': consecutiveNumber}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }




}
