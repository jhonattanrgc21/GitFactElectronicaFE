import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CreateReceiver } from '../insert-receiver/interfaces/create-receiver.interface';
import { UpdateReceiver } from '../insert-receiver/interfaces/update-receiver.interface';
import { AuthService } from '../core/auth/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiversService {

  url = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  getlistidentificationtype() {
    const method = "/channels/applicant/getlistidentificationtype";
    return this.http.post<any[]>(
      this.url + method,
      {},
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    ).pipe(
      map((response: any[]) =>
        response.filter(item => item.id >= 1 && item.id <= 3)
      )
    );
  }

  createReceiver(newReceiver: CreateReceiver){
    const method = "/createreceiver";
    const token = this.authService.geToken();
    return this.http.post(
      this.url + method,
      JSON.stringify(newReceiver),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*")
          .set("X-AUTH-TOKEN", token),
      }
    );
  }

  updateReceiver(editReceiver: UpdateReceiver){
    const method = "/updatereceiver";
    const token = this.authService.geToken();
    return this.http.post(
      this.url + method,
      JSON.stringify(editReceiver),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("X-AUTH-TOKEN", token)
          .set("Accept", "*/*"),
      }
    );
  }


  getReceiverById(receiverId: number){
    const method = "/getreceiver";
    return this.http.post(
      this.url + method,
      JSON.stringify({receiverId}),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }
}
