import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  officesSession() {
    this.router.navigate(['/listOffices']);
  }

  receiptSession() {
    this.router.navigate(['/listReceipt']);
  }
}
