import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { TableOfficeModel } from '../shared/interface/table-office.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeServices {
  constructor(private httpClient: HttpClient) {}

  public ListOffice(req: number) {
    return this.httpClient
      .get('/recebidos/office/officesList/' + req)
      .pipe(map((res: any) => res as any));
  }
}
