import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class PublicServiceServiceService {
  url = environment.apiUrl;
  private resendEmailSuccessSubject: Subject<boolean>;
  private resendEmailErrorSubject: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.resendEmailSuccessSubject = new Subject<boolean>();
    this.resendEmailErrorSubject = new Subject<boolean>();
  }

  public get resendEmailSuccess$(): Observable<boolean> {
    return this.resendEmailSuccessSubject.asObservable();
  }

  public get resendEmailError$(): Observable<boolean> {
    return this.resendEmailErrorSubject.asObservable();
  }

  getPublicServiceReceiptsByParams(
    consecutiveNumber,
    accountNumber,
    identification,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    stateId,
    paymethodId,
    saleconditionId,
    carteraId,
    doctypeId
  ) {
    const method = "/getbillfilter";
    return this.http.post(
      this.url + method,
      JSON.stringify({
        numact: accountNumber,
        identification: identification,
        date1: dateFrom,
        date2: dateTo,
        catera: carteraId,
        state: stateId,
        medpay: paymethodId,
        salecondition: saleconditionId,
        amount: amountFrom,
        amount2: amountTo,
        doctype: doctypeId,
        consecutiveNumber: consecutiveNumber,
      }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }

  getReceiptDetail(receiptId: number) {
    const method = "/publicservice/findpublicservicereceiptdetailstring";
    return this.http.post(
      this.url + method,
      JSON.stringify({ publicServiceReceiptId: receiptId }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }

  public resendBillPDF(consecutiveNumber: string, emailUser: string): void {
    this.http
      .post(
        `${this.url}/getbillbyconsecutive`,
        JSON.stringify({ consecutiveNumber, emailUser }),
        {
          headers: new HttpHeaders()
            .set("Content-Type", "text/plain")
            .set("Accept", "*/*"),
        }
      )
      .subscribe((response: any) => {
        if (response) {
          this.resendEmailSuccessSubject.next(true);
        } else {
          this.resendEmailErrorSubject.next(true);
        }
      });
  }

  getPublicServicesList() {
    const method = "/publicservice/findpublicservicelist";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getStateBill() {
    const method = "/getstatebill";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getSaleCondition() {
    const method = "/getsalecondition";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getDocType() {
    const method = "/getdoctype";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getCartera() {
    const method = "/getcartera";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getPayMethod() {
    const method = "/getpaymethod";
    return this.http.post(this.url + method, JSON.stringify({}), {
      headers: new HttpHeaders()
        .set("Content-Type", "text/plain")
        .set("Accept", "*/*"),
    });
  }

  getBillFilter(
    consecutiveNumber,
    accountNumber,
    identification,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    stateId,
    paymethodId,
    saleconditionId,
    carteraId,
    doctypeId
  ) {
    const method = "/getbillfilter";
    return this.http.post(
      this.url + method,
      JSON.stringify({
        numact: accountNumber,
        identification: identification,
        date1: dateFrom,
        date2: dateTo,
        catera: carteraId,
        state: stateId,
        medpay: paymethodId,
        salecondition: saleconditionId,
        amount: amountFrom,
        amount2: amountTo,
        doctype: doctypeId,
        consecutiveNumber: consecutiveNumber,
      }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }

  getPDF(consecutiveNumber) {
    const method = "/pdfBill";
    return this.http.post(
      this.url + method,
      JSON.stringify({ consecutiveNumber: consecutiveNumber }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }
}
