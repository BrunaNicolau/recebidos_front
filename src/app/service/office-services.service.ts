import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { TableOfficeModel } from '../shared/interface/table-office.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeServices {
  constructor(private httpClient: HttpClient) {}

  // TODO: tipar as req e res
  public ListOffices(req: number) {
    return this.httpClient
      .get('/recebidos/office/officesList/' + req)
      .pipe(map((res: any) => res as any));
  }

  public getOffice(req: number) {
    return this.httpClient
      .get('/recebidos/office/getOffice/' + req)
      .pipe(map((res: any) => res as any));
  }

  public newOffice(req: any) {
    return this.httpClient
      .post('/recebidos/office/newOffice', req)
      .pipe(map((res: any) => res as any));
  }

  public editOffice(req: any) {
    return this.httpClient
      .post('/recebidos/office/editOffice', req)
      .pipe(map((res: any) => res as any));
  }
}
