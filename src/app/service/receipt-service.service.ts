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
}
