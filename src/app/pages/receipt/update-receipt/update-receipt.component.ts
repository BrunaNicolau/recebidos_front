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

  searchReceipt(id: any) {
    // TODO: passar os dados do escritorio via header
    this.receiptService.receiptById(id.receiptID).subscribe({
      next: (res) => {
        this.fillInput(res);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  fillInput(receiptData: any) {
    const receipt = receiptData;
    this.updateReceiptForm.get('status')?.setValue(receipt.status);
    this.updateReceiptForm.get('receiptDate')?.setValue(receipt.fim);

    if (receipt.status != 'E') {
      this.updateReceiptForm.get('status')?.disable();
      this.updateReceiptForm.get('receiptDate')?.disable();
    } else {
      this.updateReceiptForm.get('status')?.enable();
      this.updateReceiptForm.get('receiptDate')?.enable();
    }
  }

  controllInput(option: any){
    //TODO: nao esta funcionando 
    console.log('passou aq:', option);
    if(option === 'E') this.updateReceiptForm.get('receiptDate')?.setValidators([Validators.required])
    else if(option === 'C') this.updateReceiptForm.get('receiptDate')?.disable();

  }

  confirm(req: any) {
    this.receiptService.updateReceipt(req).subscribe({
      next: (res) => {
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
        this.updateReceiptForm.get('receiptID')?.setValue('');
        this.updateReceiptForm.get('status')?.setValue('');
        this.updateReceiptForm.get('receiptDate')?.setValue('');
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
