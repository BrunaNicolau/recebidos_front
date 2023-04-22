import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficeServices } from 'src/app/service/office-services.service';
import { TableOfficeModel } from 'src/app/shared/interface/table-office.model';

@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.scss'],
})
export class ListOfficesComponent implements OnInit {
  displayedColumns = ['id', 'responsavel', 'status'];
  dataSource: Observable <TableOfficeModel[]>;


  constructor(private router: Router, private OfficeServices: OfficeServices) {}

  ngOnInit() {
    const req = 3;

    this.dataSource = this.OfficeServices.ListOffice(req);
    // this.OfficeServices.ListOffice(req).subscribe({
    //   next: (res) => {
    //     let teste: TableOfficeModel[] = res;
    //     console.log(teste);
    //     this.dataSource = res;
    //   },

    //   error: (error) => {},
    // });
  }

  callNewOffice() {
    this.router.navigate(['/newOffice']);
  }
}
