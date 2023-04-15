import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-home',
  templateUrl: './adm-home.component.html',
  styleUrls: ['./adm-home.component.scss']
})
export class AdmHomeComponent {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
  ){}


  officesService(){
    console.log('criar a chamada de servico lisyagem escritorio');
    this.router.navigate(['/listOffices']);
  }

}
