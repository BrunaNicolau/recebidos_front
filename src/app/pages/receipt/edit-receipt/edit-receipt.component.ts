import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OfficeServices } from 'src/app/service/office.service';
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
  pageHeader: string = 'Editar Recibos';
  listOffices: any;
  receiptID: number;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar,
    private officeService: OfficeServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
  }

  getReceiptID() {
    this.route.params.subscribe((params) => {
      this.receiptID = +params['id'];
    });

    return this.receiptID;
  }
  initForm() {
    this.editReceiptForm = this.fb.group({
      receiptID: [{ value: '', disabled: true }],
      office: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      receiptDate: [''],
      typePayment: [''],
      value: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.serviceGetReceiptData();
  }

  serviceGetReceiptData() {
    this.receiptService.receiptById(this.getReceiptID()).subscribe({
      next: (res) => {
        this.configInput(res);
        this.listOfficeService();
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  listOfficeService() {
    this.officeService
      .ListOffices(localStorage.getItem('institutionID'))
      .subscribe({
        next: (res) => {
          this.listOffices = res;
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
    this.editReceiptForm.get('receiptDate')?.setValue(receiptData.fim);
    this.editReceiptForm.get('value')?.setValue(receiptData.valor);
    this.editReceiptForm.get('status')?.setValue(receiptData.status);
    this.editReceiptForm
      .get('typePayment')
      ?.setValue(receiptData.method_payment);
  }

  confirm(req: editReceiptRequest) {
    req.receiptID = this.receiptID;
    this.receiptService.editReceipt(req).subscribe({
      next: (res) => {
        this.serviceGetReceiptData();
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    history.back();
  }
}
