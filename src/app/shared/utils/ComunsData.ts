import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunsData {
  receiptID: number;

  setReceiptID(id: any) {
    this.receiptID = id;
  }
  getReceiptID() {
    return this.receiptID;
  }
}
