import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { CodopsService } from 'src/app/services/codops.service';
import { CodopList } from '../interfaces/codops-List.interface';
import { CodopFilter } from '../interfaces/codop-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class CodopsListResolver implements Resolve<CodopList[]> {

  constructor(private codopsService: CodopsService) { }

  resolve(): Observable<CodopList[]> {
    const json: CodopFilter = {
      code: null,
      serviceCodeId: null
    }

    return this.codopsService.getCodopsList(json)
      .pipe(
        map(response => response.codopList)
      );
  }
}
