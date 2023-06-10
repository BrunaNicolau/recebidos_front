import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { text } from 'express';
import { OfficeServices } from 'src/app/service/office-services.service';
import { newOfficeRequest } from 'src/app/shared/request/newOfficeRequest';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss'],
})
export class NewOfficeComponent implements OnInit {
  newOfficeForm: FormGroup;
  date = new Date();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private OfficeServices: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // por mascara no telefone
    // por mascara no document
    // por mascara data
    this.newOfficeForm = this.fb.group({
      owner: ['', [Validators.required]],
      address: [''],
      zipCode: [''],
      telephone: ['', [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      startDate: [this.date.toLocaleDateString(), [Validators.required]],
    });
  }

  maskCEP(e: any){
    // console.log(e.data);
    // console.log(e.target.value);
    let value = e.target.value.replace(/\D/g, '');
    const text: any = []

    value.split('').forEach((char: number, index:number) => {
      switch (index) {
        case 5: 
          text.push('-')
      }
      text.push(char)
    });

    this.newOfficeForm.get('zipCode')?.patchValue(text.join(''))
  }

  confirm() {
    const req: newOfficeRequest = {
      institutionId: 1,
      responsible: this.newOfficeForm.controls['owner'].value,
      adress: this.newOfficeForm.controls['address'].value,
      zipCode: this.newOfficeForm.controls['zipCode'].value,
      telephone: this.newOfficeForm.controls['telephone'].value,
      document: this.newOfficeForm.controls['document'].value,
      email: this.newOfficeForm.controls['email'].value,
      startDate: this.newOfficeForm.controls['startDate'].value,
    };

    this.OfficeServices.newOffice(req).subscribe({
      next: (res) => {
        console.log(res);
        this.snackBar.open(res.txt + res.id, '', { duration: 5000 });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}
