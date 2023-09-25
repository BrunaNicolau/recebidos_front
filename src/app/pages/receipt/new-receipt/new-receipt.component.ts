import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReceiptServiceService } from 'src/app/service/receipt-service.service';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.scss'],
})
export class NewReceiptComponent {
  newReceiptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newReceiptForm = this.fb.group({
      institution: [''],
      office: [''],
      value: [''],
      paymentMethod: [''],
    });
  }

  //TODO: o escritorio e instituicao ira ser pego via header ?
  confirm(req: any) {
    this.receiptService.newReceipt(req).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, '', { duration: 5000 });
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
