import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { saveAs } from 'file-saver';
import { OfficeServices } from 'src/app/service/office.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-new-receipt',
    templateUrl: './new-receipt.component.html',
    styleUrls: ['./new-receipt.component.scss'],
    imports: [ToolbarComponent, ReactiveFormsModule, MatGridList, MatGridTile, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatButton]
})
export class NewReceiptComponent {
  newReceiptForm: FormGroup;
  pageHeader: string = 'Novo Recibo';
  officeID = sessionStorage.getItem('officeID');
  listOffices: any;
  methodPaymentSelect: any[];

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private officeService: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.initSelect();
    if (this.officeID != 'null') {
      this.getOfficeService(this.officeID);
    } else {
      this.listOfficeService();
    }
  }

  initForm() {
    this.newReceiptForm = this.fb.group({
      institutionId: [{ value: '1', disabled: true }],
      officeId: [''],
      value: [''],
      methodPayment: [''],
    });
  }

  initSelect(){
    this.methodPaymentSelect = [
      { value: 'C', label: 'Cartão' },
      { value: 'D', label: 'Dinheiro' },
      { value: 'T', label: 'Transferência' },
      { value: 'P', label: 'Pix' },
      { value: 'O', label: 'Outros' }
    ];
  }

  getOfficeService(id: any) {
    this.officeService.officeById(id).subscribe({
      next: (res) => {
        this.listOffices = [res];
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

  confirm(req: any) {
    req.institutionId = sessionStorage.getItem('institutionID');
    this.receiptService.newReceipt(req).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
          this.generatePDF(res.id);
        } else {
          this.snackBar.open('Unexpected response from the server', '', {
            duration: 5000,
          });
        }
      },
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  generatePDF(req: number) {
    this.receiptService.emmitReceipt(req).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          saveAs(res, `Receipt-${req}.pdf`);
          this.snackBar.open('Receipt downloaded successfully', '', {
            duration: 5000,
          });
          this.clearform();
        } else {
          this.snackBar.open('Unexpected response from the server', '', {
            duration: 5000,
          });
        }
      },
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  clearform(){
    this.newReceiptForm.patchValue({
      officeId: [''],
      value: [''],
      methodPayment: [''],
    });
  }

  backToLastPage() {
    history.back();
  }
}
