import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiptServiceService } from 'src/app/service/receipt.service';

@Component({
  selector: 'app-update-receipt',
  templateUrl: './update-receipt.component.html',
  styleUrls: ['./update-receipt.component.scss'],
})
export class UpdateReceiptComponent {
  updateReceiptForm: FormGroup;
  pageHeader: string = 'Atualizar Recibo';
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
      receiptId: [''],
      status: [{ value: '', disabled: true }],
      receiptDate: [{ value: '', disabled: true }],
    });
  }

  searchReceipt(event: any) {
    if (event.target.value) {
      this.receiptService.receiptById(event.target.value).subscribe({
        next: (res) => {
          this.fillInput(res);
        },
        error: (e) => {
          this.snackBar.open(e.error.message, '', { duration: 5000 });
          this.cleanFields();
        },
      });
    } else {
      this.cleanFields();
    }
  }

  fillInput(receiptData: any) {
    const receipt = receiptData;
    this.updateReceiptForm.get('status')?.setValue(receipt.status);
    this.updateReceiptForm.get('receiptDate')?.setValue(receipt.enddate);

    if (receipt.status == 'E') {
      this.updateReceiptForm.get('status')?.enable();
      this.updateReceiptForm.get('receiptDate')?.disable();
    } else if (receipt.status == 'C') {
      this.updateReceiptForm.get('status')?.disable();
      this.updateReceiptForm.get('receiptDate')?.disable();
    } else if (receipt.status == 'R') {
      this.updateReceiptForm.get('status')?.disable();
      this.updateReceiptForm.get('receiptDate')?.setValue(receipt.enddate);
      this.updateReceiptForm.get('receiptDate')?.disable();
    }

    this.verifyInputValue();
  }

  verifyInputValue() {
    const receiptDateControl = this.updateReceiptForm.get('receiptDate');

    this.updateReceiptForm.get('status')?.valueChanges.subscribe((newValue) => {
      if (newValue === 'E') {
        receiptDateControl?.setValue('');
        receiptDateControl?.disable();
        receiptDateControl?.setValidators(null);
      } else if (newValue === 'C') {
        receiptDateControl?.enable();
        receiptDateControl?.setValidators([Validators.required]);
      } else if (newValue === 'R') {
        receiptDateControl?.enable();
        receiptDateControl?.setValidators([Validators.required]);
      }
    });
  }

  isSubmitButtonDisabled() {
    const status = this.updateReceiptForm.get('status')?.value;
    const receiptDate = this.updateReceiptForm.get('receiptDate')?.value;

    if ((status === 'R' && receiptDate) || (status === 'C' && receiptDate))
      return false;

    return true;
  }

  confirm(req: any) {
    this.receiptService.updateReceipt(req).subscribe({
      next: (res) => {
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
        this.cleanFields();
      },
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  cleanFields() {
    this.updateReceiptForm.get('receiptId')?.setValue('');
    this.updateReceiptForm.get('status')?.setValue('');
    this.updateReceiptForm.get('receiptDate')?.setValue('');
  }

  backToLastPage() {
    history.back();
  }
}
