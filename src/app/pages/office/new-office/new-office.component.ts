import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss'],
})
export class NewOfficeComponent implements OnInit {
  newOfficeForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private OfficeServices: OfficeServices
  ) {}

  ngOnInit() {
    this.newOfficeForm = this.fb.group({
      owner: [''],
      address: [''],
      telephone: [''],
      document: [''],
      email: [''],
      startDate: [''],
    });
  }

  confirm() {
    //TODO: chamra servicos
    const req = this.newOfficeForm;
    console.log(req);
    this.OfficeServices.newOffice(req).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}
