import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OfficeServices } from 'src/app/service/office.service';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { editReceiptRequest } from 'src/app/shared/request/editReceiptRequest';
import { receiptDataResponse } from 'src/app/shared/response/receiptDataResponse';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-edit-receipt',
    templateUrl: './edit-receipt.component.html',
    styleUrls: ['./edit-receipt.component.scss'],
    imports: [ToolbarComponent, ReactiveFormsModule, MatGridList, MatGridTile, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
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
