import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss']
})
export class EditOfficeComponent {

  constructor(private router: Router){

  }

  confirm(){
    //TODO: chamar servicos
  }

  backToLastPage() {
    this.router.navigate(['/listOffices']);
  }
}

