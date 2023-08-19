import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.sass'],
})
export class NewReceiptComponent {
  newReceiptForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newReceiptForm = this.fb.group({
      receiptID: ['']
    });
  }

  confirm(req: any) {}
}
