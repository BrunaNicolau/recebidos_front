import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfficeServices {
  constructor(private httpClient: HttpClient) {}

  // TODO: tipar as req e res
  public officesList(req: any) {
    return this.httpClient
      .get('/recebidos/office/officesList/' + req)
      .pipe(map((res: any) => res as any));
  }

  public officeById(req: number) {
    return this.httpClient
      .get('/recebidos/office/officeById/' + req)
      .pipe(map((res: any) => res as any));
  }

  public newOffice(req: any) {
    return this.httpClient
      .post('/recebidos/office/newOffice', req)
      .pipe(map((res: any) => res as any));
  }

  public editOffice(req: any) {
    return this.httpClient
      .put('/recebidos/office/editOffice', req)
      .pipe(map((res: any) => res as any));
  }
}
