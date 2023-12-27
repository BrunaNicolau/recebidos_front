import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { editReceiptRequest } from 'src/app/shared/request/editReceiptRequest';
import { receiptDataResponse } from 'src/app/shared/response/receiptDataResponse';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent implements OnInit {
  editReceiptForm: FormGroup;
  pageHeader: string = "Editar Recibos";
  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editReceiptForm = this.fb.group({
      receiptID: [{ value: '', disabled: true }],
      office: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      receiveDate: [''],
      typePayment: [''],
      value: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.serviceGetReceiptData();
  }

  serviceGetReceiptData() {
    const req = this.receiptService.getSelectedReceiptId();
    this.receiptService.receiptById(req).subscribe({
      next: (res) => {
        this.configInput(res);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  configInput(res: receiptDataResponse) {
    const receiptData = res;
    this.editReceiptForm.get('receiptID')?.setValue(receiptData.id);
    this.editReceiptForm.get('office')?.setValue(receiptData.escritorio_id);
    this.editReceiptForm.get('startDate')?.setValue(receiptData.inicio);
    this.editReceiptForm.get('receiveDate')?.setValue(receiptData.fim);
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
    history.back();
  }
}
