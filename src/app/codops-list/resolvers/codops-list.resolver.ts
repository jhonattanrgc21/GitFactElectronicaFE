import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { CodopsService } from 'src/app/services/codops.service';
import { CodopFilter } from '../interfaces/codop-filter.interface';
import { Codop } from '../interfaces/codops-list.interface';

@Injectable({
  providedIn: 'root'
})
export class CodopsListResolver implements Resolve<Codop[]> {

  constructor(private codopsService: CodopsService) { }

  resolve(): Observable<Codop[]> {
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
