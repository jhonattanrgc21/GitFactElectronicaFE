import { Injectable } from '@angular/core';
import { ServiceCode } from '../interfaces/service-code.interface';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CodopsService } from 'src/app/services/codops.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceCodeResolver implements Resolve<ServiceCode[]>{

  constructor(private codopsService: CodopsService) { }

  resolve(): Observable<ServiceCode[]> {
    return this.codopsService.getServiceCodeList()
      .pipe(
        map(response => response.data)
      );
  }
}
