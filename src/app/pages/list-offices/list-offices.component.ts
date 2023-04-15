import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: number;
  responsavel: string;
  arrecadados: number;
  status: string;  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, responsavel: 'Hydrogen', arrecadados: 1.0079, status: 'H'},
  {id: 2, responsavel: 'Helium', arrecadados: 4.0026, status: 'He'},
  {id: 3, responsavel: 'Lithium', arrecadados: 6.941, status: 'Li'},
  {id: 4, responsavel: 'Beryllium', arrecadados: 9.0122, status: 'Be'},
  {id: 5, responsavel: 'Boron', arrecadados: 10.811, status: 'B'},
  {id: 6, responsavel: 'Carbon', arrecadados: 12.0107, status: 'C'},
  {id: 7, responsavel: 'Nitrogen', arrecadados: 14.0067, status: 'N'},
  {id: 8, responsavel: 'Oxygen', arrecadados: 15.9994, status: 'O'},
  {id: 9, responsavel: 'Fluorine', arrecadados: 18.9984, status: 'F'},
  {id: 10, responsavel: 'Neon', arrecadados: 20.1797, status: 'Ne'},
];

@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.scss']
})
export class ListOfficesComponent {
  displayedColumns: string[] = ['id', 'responsavel', 'arrecadados', 'status'];
  dataSource = ELEMENT_DATA;

  constructor(
    private router: Router,
  ){}

  callNewOffice(){
    this.router.navigate(['/newOffice'])
  }
}
