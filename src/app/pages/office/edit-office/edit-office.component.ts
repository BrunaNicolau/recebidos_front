import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfficeServices } from 'src/app/service/office.service';
import { editOfficeRequest } from 'src/app/shared/request/editOfficeRequest';
import { officeDataResponse } from 'src/app/shared/response/officeDataResponse';
import { ComunsData } from 'src/app/shared/utils/ComunsData';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { NgxMaskModule } from 'ngx-mask';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-edit-office',
    templateUrl: './edit-office.component.html',
    styleUrls: ['./edit-office.component.scss'],
    imports: [ToolbarComponent, ReactiveFormsModule, MatGridList, MatGridTile, MatFormField, MatLabel, MatInput, MatError, NgxMaskModule, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class EditOfficeComponent implements OnInit {
  editOfficeForm: FormGroup;
  officeRes: officeDataResponse;
  pageHeader: string = 'Editar de Escritorios';

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
      responsable: ['', [Validators.required]],
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
    this.officeService.officeById(req).subscribe({
      next: (res) => {
        this.officeRes = res;
        this.configInput();
      },
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  configInput() {
    this.editOfficeForm.get('id')?.setValue(this.officeRes.id);
    this.editOfficeForm
      .get('responsable')
      ?.setValue(this.officeRes.responsable);
    this.editOfficeForm.get('telephone')?.setValue(this.officeRes.telephone);
    this.editOfficeForm.get('address')?.setValue(this.officeRes.address);
    this.editOfficeForm.get('zipCode')?.setValue(this.officeRes.zipcode);
    this.editOfficeForm.get('email')?.setValue(this.officeRes.email);
    this.editOfficeForm.get('document')?.setValue(this.officeRes.document);
    this.editOfficeForm.get('status')?.setValue(this.officeRes.status);
    if (this.editOfficeForm.get('status')?.value == 'inativo')
      this.editOfficeForm.get('status')?.disable();
    this.editOfficeForm.get('startDate')?.setValue(this.officeRes.startdate);
    this.editOfficeForm.get('endDate')?.setValue(this.officeRes.enddate);
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
    reqEdit.responsable = formData.responsable || '';
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
      error: (e) => {
        this.snackBar.open(e.error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    history.back();
  }
}
