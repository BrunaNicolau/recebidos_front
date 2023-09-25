import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';
import { editOfficeRequest } from 'src/app/shared/request/editOfficeRequest';
import { officeDataResponse } from 'src/app/shared/response/officeDataResponse';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss'],
})
export class EditOfficeComponent implements OnInit {
  editOfficeForm: FormGroup;
  officeRes: officeDataResponse;
  reqEdit: editOfficeRequest = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private officeService: OfficeServices,
    private snackBar: MatSnackBar
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
    //TODO: ajustar requisicoes
    const req = 33;
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

  confirm(form: any) {
    const formData = form;
    this.reqEdit.responsible =
      formData.responsible != null ? formData.responsible : '';
    this.reqEdit.document = formData.document != null ? formData.document : 0;
    this.reqEdit.address = formData.address != null ? formData.address : '';
    this.reqEdit.zipCode = formData.zipCode != null ? formData.zipCode : 0;
    this.reqEdit.status = formData.status != null ? formData.status : '';
    this.reqEdit.officeId = this.officeRes.id != null ? this.officeRes.id : 0;
    this.reqEdit.telephone =
      formData.telephone != null ? formData.telephone : 0;
    if (formData.endDate) this.reqEdit.endDate = formData.endDate;
    this.reqEdit.email = formData.email != null ? formData.email : '';
    this.officeService.editOffice(this.reqEdit).subscribe({
      next: (res) => {
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
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
