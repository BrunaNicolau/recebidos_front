import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReceiptServiceService } from 'src/app/service/receipt-service.service';
import { editReceiptRequest } from 'src/app/shared/request/editReceiptRequest';
import { receiptDataResponse } from 'src/app/shared/response/receiptDataResponse';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent implements OnInit {
  editReceiptForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editReceiptForm = this.fb.group({
      receiptID: ['', [Validators.required]],
      office: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      receiveDate: [''],
      typePayment: [''],
      value: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.serviceGetReceiptData();
  }

  serviceGetReceiptData() {
    const req = 1;
    this.receiptService.receiptById(req).subscribe({
      next: (res) => {
        console.log(res);
        this.configInput(res);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  configInput(res: receiptDataResponse) {
    console.log(res);
    // TODO: tratar datas
    const receiptData = res;
    let configStartDate; 
    let configEndDate; 

    if (receiptData.fim)
    configEndDate = new Date(receiptData.fim).toLocaleDateString();
    if (receiptData.inicio)
    configStartDate = new Date(receiptData.inicio).toLocaleDateString();
    this.editReceiptForm.get('receiptID')?.setValue(receiptData.id);
    this.editReceiptForm.get('office')?.setValue(receiptData.escritorio_id);
    this.editReceiptForm.get('startDate')?.setValue(configStartDate);
    this.editReceiptForm.get('receiveDate')?.setValue(configEndDate);
    this.editReceiptForm.get('value')?.setValue(receiptData.valor);
    this.editReceiptForm.get('status')?.setValue(receiptData.status);
  }

  confirm(req: editReceiptRequest) {
    this.receiptService.editReceipt(req).subscribe({
      next: (res) => {
        this.configInput(res);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    this.router.navigate(['/listReceipt']);
  }
}
