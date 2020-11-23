import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsertBillService {
  url = environment.apiUrl;
  nmtId=environment.defaultNmtId;
  pmnId=environment.defaultPmnId;
  constructor(private http: HttpClient) { }

getReferenceDocument(){
  const method = '/referencedoclist';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getCurrency(){
  const method = '/currencylist';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

getReferenceCode(){
  const method = '/referencecodelist';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}

insertyBill(currencyId,receiverIdentification,establishmentNumber,referenceDocument,billDate,details) {

    const method = '/insertbill';
    return this.http.post(
      this.url + method,
      JSON.stringify({'crcId': currencyId,'rcvIdentification':receiverIdentification,'esbId':establishmentNumber,'referenceDocumentId':referenceDocument,
      'bill_date':billDate,'pmnId':this.pmnId,'nmtId':this.nmtId,'dtlsarray':details}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

  insertCreditNote(currencyId,receiverIdentification,establishmentNumber,referenceDocument,billDate,details,referenceCode,consecutiveNumber) {

    const method = '/insertbill';
    return this.http.post(
      this.url + method,
      JSON.stringify({'crcId': currencyId,'rcvIdentification':receiverIdentification,'esbId':establishmentNumber,'referenceDocumentId':referenceDocument,
      'bill_date':billDate,'pmnId':this.pmnId,'nmtId':this.nmtId,'dtlsarray':details, 'referenceCode':referenceCode,'consecutive':consecutiveNumber}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

  getCreditNoteData(consecutiveNumber){
    const method = '/getBillDetails';
    return this.http.post(
      this.url + method,
      JSON.stringify({'consecutiveNumber': consecutiveNumber}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

  getMeasureList(){
  const method = '/unitslist';
  return this.http.post(
    this.url + method,
    JSON.stringify({}),
    { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
  );
}
  getServiceCodeList(){
    const method = '/getallservicode';
    return this.http.post(
      this.url + method,
      JSON.stringify({}),
      { headers: new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', '*/*') }
    );
  }

}
