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
    standalone: false
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
      receiptId: [{ value: '', disabled: true }],
      officeId: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      receiptDate: [''],
      methodPayment: [''],
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
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  listOfficeService() {
    this.officeService
      .officesList(sessionStorage.getItem('institutionID'))
      .subscribe({
        next: (res) => {
          this.listOffices = res;
        },
        error: (e) => {
          this.snackBar.open(e.error.message, '', { duration: 5000 });
        },
      });
  }

  configInput(res: receiptDataResponse) {
    const receiptData = res;
    //TODO: bug datas divergente
    const startDate = receiptData.startdate
      ? new Date(receiptData.startdate)
      : null;
    const endDate = receiptData.enddate ? new Date(receiptData.enddate) : null;

    this.editReceiptForm.get('receiptId')?.setValue(receiptData.id);
    this.editReceiptForm.get('officeId')?.setValue(receiptData.officeid);
    this.editReceiptForm.get('startDate')?.setValue(startDate);
    this.editReceiptForm.get('receiptDate')?.setValue(endDate);
    this.editReceiptForm.get('value')?.setValue(receiptData.value);
    this.editReceiptForm.get('status')?.setValue(receiptData.status);
    this.editReceiptForm
      .get('methodPayment')
      ?.setValue(receiptData.methodpayment);
  }

  confirm(req: editReceiptRequest) {
    req.receiptId = this.receiptID;
    this.receiptService.editReceipt(req).subscribe({
      next: (res) => {
        this.serviceGetReceiptData();
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
      },
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    history.back();
  }
}
