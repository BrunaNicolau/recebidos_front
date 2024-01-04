import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { saveAs } from 'file-saver';
import { OfficeServices } from 'src/app/service/office.service';
@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent {
  newReceiptForm: FormGroup;
  pageHeader: string = 'Novo Recibo';
  officeID = localStorage.getItem('officeID');
  listOffices: any;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private officeService: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.officeID != 'null') {
      this.getOfficeService(this.officeID);
    } else {
      this.listOfficeService();
    }
  }

  initForm() {
    this.newReceiptForm = this.fb.group({
      institution: [{ value: '1', disabled: true }],
      office: [''],
      value: [''],
      paymentMethod: [''],
    });
  }

  getOfficeService(id: any) {
    this.officeService.getOffice(id).subscribe({
      next: (res) => {
        this.listOffices = [res];
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

  confirm(req: any) {
    req.institution = '1';
    this.receiptService.createReceipt(req).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open(res, '', { duration: 5000 });
          this.generatePDF(res.id);
        } else {
          this.snackBar.open('Unexpected response from the server', '', {
            duration: 5000,
          });
        }
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  generatePDF(req: number) {
    this.receiptService.emmitReceipt(req).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          //TODO: deixar o nome do arquivo dinamico
          saveAs(res, 'Receipt.pdf');
          this.snackBar.open('Receipt downloaded successfully', '', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('Unexpected response from the server', '', {
            duration: 5000,
          });
        }
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
