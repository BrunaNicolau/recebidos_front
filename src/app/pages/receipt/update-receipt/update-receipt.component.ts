import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptServiceService } from 'src/app/service/receipt.service';

@Component({
  selector: 'app-update-receipt',
  templateUrl: './update-receipt.component.html',
  styleUrls: ['./update-receipt.component.scss'],
})
export class UpdateReceiptComponent {
  updateReceiptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updateReceiptForm = this.fb.group({
      receiptID: [''],
      status: [{ value: '', disabled: true }],
      receiptDate: [{ value: '', disabled: true }],
      anotation: [{ value: '', disabled: true }],
    });
  }

  searchReceipt(id: any) {
    // TODO: passar os dados do escritorio via header
    this.receiptService.receiptById(id).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, '', { duration: 5000 });
        this.updateReceiptForm.get('receiptID')?.disable();
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  confirm(req: any) {
    this.receiptService.updateReceipt(req).subscribe({
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
