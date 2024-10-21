import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth/services/auth/auth.service';
import { ServiceCodeResponse } from '../codops-list/interfaces/service-code.interface';
import { CodopFilter } from '../codops-list/interfaces/codop-filter.interface';
import { CreateCodop } from '../insert-codop/interfaces/create-codop.interface';
import { GeneralResponse } from '../shared/interfaces/generalResponse.interface';
import { ActiveCodop } from '../codops-list/interfaces/active-codop.interface';
import { CodopsListResponse } from '../codops-list/interfaces/codops-list.interface';

@Injectable({
  providedIn: 'root'
})
export class CodopsService {
  url =  environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.geToken();
    return new HttpHeaders({
      'Content-Type': 'text/json',
      'Accept': '*/*',
      'X-AUTH-TOKEN': token,
    });
  }

  getServiceCodeList() {
    return this.http.get<ServiceCodeResponse>(
      `${this.url}/getServiceCodeList`,
      { headers: this.getHeaders() }
    );
  }

  getCodopsList(json: CodopFilter) {
    return this.http.post<CodopsListResponse >(
      `${this.url}/getCodops`,
      JSON.stringify(json),
      { headers: this.getHeaders() }
    );
  }


  createCodop(json: CreateCodop) {
    return this.http.post<GeneralResponse>(
      `${this.url}/createCodop`,
      JSON.stringify(json),
      { headers: this.getHeaders() }
    );
  }

  modifyCodopStatus(json: ActiveCodop) {
    return this.http.post<GeneralResponse>(
      `${this.url}/modifyCodopStatus`,
      JSON.stringify(json),
      { headers: this.getHeaders() }
    );
  }
}
