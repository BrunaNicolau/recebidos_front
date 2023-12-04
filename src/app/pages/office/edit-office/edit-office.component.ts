import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfficeServices } from 'src/app/service/office.service';
import { editOfficeRequest } from 'src/app/shared/request/editOfficeRequest';
import { officeDataResponse } from 'src/app/shared/response/officeDataResponse';
import { ComunsData } from 'src/app/shared/utils/ComunsData';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss'],
})
export class EditOfficeComponent implements OnInit {
  editOfficeForm: FormGroup;
  officeRes: officeDataResponse;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeServices,
    private snackBar: MatSnackBar,
    private officeDTO: ComunsData
  ) {}

  ngOnInit() {
    this.initForm();
    this.serviceGetOfficeData();
  }

  initForm() {
    this.editOfficeForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      responsible: ['', [Validators.required]],
      address: [''],
      zipCode: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      endDate: [''],
    });
  }

  serviceGetOfficeData() {
    const req = this.officeDTO.getReceiptID();
    this.officeService.getOffice(req).subscribe({
      next: (res) => {
        this.officeRes = res;
        this.configInput();
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  configInput() {
    this.editOfficeForm.get('id')?.setValue(this.officeRes.id);
    this.editOfficeForm
      .get('responsible')
      ?.setValue(this.officeRes.responsavel);
    this.editOfficeForm.get('telephone')?.setValue(this.officeRes.telefone);
    this.editOfficeForm.get('address')?.setValue(this.officeRes.endereco);
    this.editOfficeForm.get('zipCode')?.setValue(this.officeRes.cep);
    this.editOfficeForm.get('email')?.setValue(this.officeRes.email);
    this.editOfficeForm.get('document')?.setValue(this.officeRes.documento);
    this.editOfficeForm.get('status')?.setValue(this.officeRes.status);
    if (this.editOfficeForm.get('status')?.value == 'inativo')
      this.editOfficeForm.get('status')?.disable();
    this.editOfficeForm.get('startDate')?.setValue(this.officeRes.inicio);
    this.editOfficeForm.get('endDate')?.setValue(this.officeRes.fim);
  }

  checkStatus(t: string) {
    if (t == 'inativo' && this.editOfficeForm.get('endDate')?.value) {
      this.editOfficeForm.get('endDate')?.enable();
    } else {
      this.editOfficeForm.get('endDate')?.disable();
    }
  }

  createEditReq(form: any) {
    const formData = form;
    const reqEdit: editOfficeRequest = {};
    reqEdit.responsible = formData.responsible || '';
    reqEdit.document = formData.document || 0;
    reqEdit.address = formData.address || '';
    reqEdit.zipCode = formData.zipCode || 0;
    reqEdit.officeId = this.officeRes.id || 0;
    reqEdit.telephone = formData.telephone || 0;
    reqEdit.email = formData.email || '';
    if (formData.endDate) reqEdit.endDate = formData.endDate;
    if (formData.status && !formData.status.disabled)
      reqEdit.status = formData.status;
    else reqEdit.status = 'inativo';

    return reqEdit;
  }

  confirm(form: any) {
    const req = this.createEditReq(form);
    this.officeService.editOffice(req).subscribe({
      next: (res) => {
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
      },
      error: (error) => {
        //TODO: melhorar isso no back
        if (
          error.error &&
          Array.isArray(error.error.error) &&
          error.error.error.length > 0
        ) {
          const errorMessage = error.error.error[0];
          this.snackBar.open(errorMessage, '', { duration: 5000 });
        } else {
          this.snackBar.open('An error occurred', '', { duration: 5000 });
        }
      },
    });
  }

  backToLastPage() {
    history.back();
  }
}
