import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserLogin } from "../../../../entry/constants/user-login.model";
import * as jwt_decode from "jwt-decode";
import { TokenData } from "../../models/token-data";

@Injectable()
export class AuthService {
  private loginUrl: string;
  private authLoginSuccessSubject: Subject<boolean>;
  private authLoginErrorSubject: Subject<string>;
  private authLogoutSuccessSubject: Subject<boolean>;
  private authLogoutErrorSubject: Subject<string>;

  constructor(private http: HttpClient) {
    this.loginUrl = environment.apiLoginUrl;
    this.authLoginSuccessSubject = new Subject<boolean>();
    this.authLoginErrorSubject = new Subject<string>();
    this.authLogoutSuccessSubject = new Subject<boolean>();
    this.authLogoutErrorSubject = new Subject<string>();
  }

  public get authLoginSuccess$(): Observable<boolean> {
    return this.authLoginSuccessSubject.asObservable();
  }

  public get authLoginError$(): Observable<string> {
    return this.authLoginErrorSubject.asObservable();
  }

  public get authLogoutSuccess$(): Observable<boolean> {
    return this.authLogoutSuccessSubject.asObservable();
  }

  public get authLogoutError$(): Observable<string> {
    return this.authLogoutErrorSubject.asObservable();
  }

  public onLogin(userlogin: UserLogin): void {
    this.http
      .post(`${this.loginUrl}/security/userlogin`, JSON.stringify(userlogin), {
        observe: "response",
      })
      .subscribe((user: HttpResponse<any>) => {
        if (user.body.status === 200) {
          const token = user.headers.get("X-AUTH-TOKEN");
          const employeeName = user.body.employeeName;
          this.storeLoginData(token, employeeName);
          this.authLoginSuccessSubject.next(true);
        } else {
          this.authLoginErrorSubject.next(user.body.message);
        }
      });
  }

  public onLogout(): void {
    this.http
      .post(
        `${this.loginUrl}/general/logout`,
        JSON.stringify({ channelId: 117 }),
        {
          headers: new HttpHeaders().set("X-AUTH-TOKEN", this.geToken()),
        }
      )
      .subscribe((response: any) => {
        if (response.type === "success") {
          this.removeLocalStorage();
          this.authLogoutSuccessSubject.next(true);
        } else {
          this.authLogoutErrorSubject.next(response.message);
        }
      });
  }

  public storeLoginData(token: string, user: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("employeeName", user);
  }

  public geToken(): string {
    return localStorage.getItem("token") || "";
  }

  public getUsername(): string {
    return localStorage.getItem("employeeName");
  }

  public removeLocalStorage(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeName");
  }

  public isTokenValid(): boolean {
    return Boolean(this.geToken()) && this.getJwtData().exp > Date.now() / 1000;
  }

  public getJwtData(): TokenData {
    return jwt_decode(this.geToken()) as TokenData;
  }
}
