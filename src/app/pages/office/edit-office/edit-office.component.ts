import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';
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
    let req = 3;
    this.officeService.getOffice(req).subscribe({
      next: (res) => {
        this.officeRes = res;
        console.log(this.officeRes); 
        // this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
      },
      error: (error) => {
        console.log(error);
        // this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  

  confirm() {
    //TODO: chamar servicos
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}
