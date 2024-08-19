import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReceiversService } from 'src/app/services/receivers.service';
import { IdentificationType } from '../interfaces/identification-type.interface';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypesResolver implements Resolve<any>{

  constructor(private receiversService: ReceiversService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IdentificationType[]> {
    return this.receiversService.getlistidentificationtype();
  }
}
