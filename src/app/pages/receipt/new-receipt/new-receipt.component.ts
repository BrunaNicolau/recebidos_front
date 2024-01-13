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
  officeID = sessionStorage.getItem('officeID');
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
      institutionId: [{ value: '1', disabled: true }],
      officeId: [''],
      value: [''],
      paymentMethod: [''],
    });
  }

  getOfficeService(id: any) {
    this.officeService.officeById(id).subscribe({
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
      .officesList(sessionStorage.getItem('institutionID'))
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
    req.institutionId = sessionStorage.getItem('institutionID');
    this.receiptService.newReceipt(req).subscribe({
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
          saveAs(res, `Receipt-${req}.pdf`);
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
