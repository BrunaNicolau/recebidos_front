import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceiptServiceService {
  constructor(private httpClient: HttpClient) {}

  public ListReceipts(req: number) {
    return this.httpClient
      .get('/recebidos/receipt/listReceipts/' + req)
      .pipe(map((res: any) => res as any));
  }

  public receiptById(req: number) {
    return this.httpClient
      .get('/recebidos/receipt/receiptById/' + req)
      .pipe(map((res: any) => res as any));
  }

  //TODO: mudar o tipo
  public newReceipt(req: any) {
    return this.httpClient
      .post('/recebidos/receipt/createReceipts', req)
      .pipe(map((res: any) => res as any));
  }

  public editReceipt(req: any) {
    return this.httpClient
      .put('/recebidos/receipt/editReceipt', req)
      .pipe(map((res: any) => res as any));
  }

  public updateReceipt(req: any) {
    return this.httpClient
      .put('/recebidos/receipt/updateReceipt', req)
      .pipe(map((res: any) => res as any));
  }

}
