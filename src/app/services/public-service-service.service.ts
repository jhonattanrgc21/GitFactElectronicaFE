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
  private reprocessBillSuccessSubject: Subject<boolean>;
  private reprocessBillErrorSubject: Subject<boolean>;
  private rejectionMessageSuccessSubject: Subject<string>;
  private rejectionMessageErrrSubject: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.resendEmailSuccessSubject = new Subject<boolean>();
    this.resendEmailErrorSubject = new Subject<boolean>();
    this.reprocessBillSuccessSubject = new Subject<boolean>();
    this.reprocessBillErrorSubject = new Subject<boolean>();
    this.rejectionMessageSuccessSubject = new Subject<string>();
    this.rejectionMessageErrrSubject = new Subject<boolean>();
  }

  public get resendEmailSuccess$(): Observable<boolean> {
    return this.resendEmailSuccessSubject.asObservable();
  }

  public get resendEmailError$(): Observable<boolean> {
    return this.resendEmailErrorSubject.asObservable();
  }

  public get reprocessBillSuccess$(): Observable<boolean> {
    return this.reprocessBillSuccessSubject.asObservable();
  }

  public get reprocessBillError$(): Observable<boolean> {
    return this.reprocessBillErrorSubject.asObservable();
  }

  public get rejectionMessageSuccess$(): Observable<string> {
    return this.rejectionMessageSuccessSubject.asObservable();
  }

  public get rejectionMessageError$(): Observable<boolean> {
    return this.rejectionMessageErrrSubject.asObservable();
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

  sendBillPDF(consecutiveNumber) {
    const method = "/getbillbyconsecutive";
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

  public reprocessBill(consecutiveNumber: string): void {
    this.http
      .post(
        `${this.url}/getreprocessxmlbill`,
        JSON.stringify({ consecutiveNumber })
      )
      .subscribe((response: any) => {
        if (response == 1 || response == 3) {
          this.reprocessBillSuccessSubject.next(true);
        } else {
          this.reprocessBillErrorSubject.next(true);
        }
      });
  }

  public getRejectionMessage(consecutiveNumber: string): void {
    this.http
      .get(`${this.url}/getrejectionmessage/${consecutiveNumber}`)
      .subscribe((message: any) => {
        if (message.success !== null) {
          this.rejectionMessageSuccessSubject.next(message.success);
        } else {
          this.reprocessBillErrorSubject.next(true);
        }
      });
  }
}
