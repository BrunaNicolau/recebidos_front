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
    });
  }

  searchReceipt(event: any) {
    // TODO: passar os dados do escritorio via header
    if (event.target.value) {
      this.receiptService.receiptById(event.target.value).subscribe({
        next: (res) => {
          this.fillInput(res);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, '', { duration: 5000 });
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
    this.updateReceiptForm.get('receiptDate')?.setValue(receipt.fim);

    if (receipt.status == 'E') {
      this.updateReceiptForm.get('status')?.enable();
      this.updateReceiptForm.get('receiptDate')?.disable();
    } else if (receipt.status == 'C') {
      this.updateReceiptForm.get('status')?.disable();
      this.updateReceiptForm.get('receiptDate')?.disable();
    } else if (receipt.status == 'R') {
      this.updateReceiptForm.get('status')?.disable();
      this.updateReceiptForm.get('receiptDate')?.setValue(receipt.fim);
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
      error: (error) => {
        this.snackBar.open(error.error.message, '', { duration: 5000 });
      },
    });
  }

  cleanFields() {
    this.updateReceiptForm.get('receiptID')?.setValue('');
    this.updateReceiptForm.get('status')?.setValue('');
    this.updateReceiptForm.get('receiptDate')?.setValue('');
  }

  backToLastPage() {
    history.back();
  }
}
