import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';
import { editOfficeRequest } from 'src/app/shared/request/editOfficeRequest';
import { getOfficeDataResponse } from 'src/app/shared/response/getOfficeDataResponse';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss'],
})
export class EditOfficeComponent implements OnInit {
  editOfficeForm: FormGroup;
  officeRes: getOfficeDataResponse;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private officeService: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.serviceRescueOfficeData();
  }

  initForm() {
    //TODO: desabilitar os campos que nao podem ser editado
    this.editOfficeForm = this.fb.group({
      id: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
      address: [''],
      zipCode: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
    });
  }

  serviceRescueOfficeData() {
    const req = 3;
    this.officeService.getOffice(req).subscribe({
      next: (res) => {
        this.officeRes = res;
        const configEndDate = new Date(
          this.officeRes.inicio
        ).toLocaleDateString();
        const configStartDate = new Date(
          this.officeRes.fim
        ).toLocaleDateString();

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
        this.editOfficeForm.get('startDate')?.setValue(configEndDate);
        this.editOfficeForm.get('startDate')?.setValue(configStartDate);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  confirm() {
    //TODO: montar essa req direito, modelo no postman
    const reqEdit: editOfficeRequest = {...this.editOfficeForm.getRawValue()}
    console.log(reqEdit)
    this.officeService.editOffice(reqEdit).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}
