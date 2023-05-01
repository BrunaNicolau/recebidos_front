import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss'],
})
export class NewOfficeComponent {
  newOfficeForm = this.formBuilder

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  confirm() {
    //TODO: chamra servicos
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}
