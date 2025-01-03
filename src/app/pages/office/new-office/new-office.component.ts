import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office.service';
import { newOfficeRequest } from 'src/app/shared/request/newOfficeRequest';

@Component({
    selector: 'app-new-office',
    templateUrl: './new-office.component.html',
    styleUrls: ['./new-office.component.scss'],
    standalone: false
})
export class NewOfficeComponent implements OnInit {
  newOfficeForm: FormGroup;
  date = new Date();
  pageHeader: string = 'Cadastro de Escritorios';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private OfficeServices: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newOfficeForm = this.fb.group({
      responsable: ['', [Validators.required]],
      address: [''],
      zipCode: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      startDate: [this.date, [Validators.required]],
    });
  }

  confirm(form: newOfficeRequest) {
    const req = form;
    req.institutionId = sessionStorage.getItem('institutionID');
    this.OfficeServices.newOffice(req).subscribe({
      next: (res) => {
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
        this.router.navigate(['office']);
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
