import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-receipt',
  templateUrl: './update-receipt.component.html',
  styleUrls: ['./update-receipt.component.scss'],
})
export class UpdateReceiptComponent {
  updateReceiptForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updateReceiptForm = this.fb.group({
      receiptID: [''],
      status: [''],
      receiptDate: [''],
      anotation: ['']
    });
  }

  searchReceipt(id: any){

  }

  confirm(req: any){

  }

  backToLastPage(){

  }
}
