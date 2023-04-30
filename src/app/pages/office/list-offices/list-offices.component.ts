import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';
import { TableOfficeModel } from 'src/app/shared/interface/table-office.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.scss'],
})
export class ListOfficesComponent implements OnInit {
  displayedColumns = ['id', 'responsavel', 'status', 'acao'];
  dataTable: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private OfficeServices: OfficeServices) {}

  ngOnInit() {
    const req = 3;
    this.OfficeServices.ListOffice(req).subscribe({
      next: (res) => {
        console.log(res);
        this.empdata = res;
        this.dataTable = new MatTableDataSource<TableOfficeModel>(res);
        this.dataTable.paginator = this.paginator;
      },

      error: (error) => {},
    });
  }

  callTableDataService() {
    const req = 3;
    this.OfficeServices.ListOffice(req).subscribe({
      next: (res) => {
        console.log(res);
        this.empdata = res;
        this.dataTable = new MatTableDataSource<TableOfficeModel>(res);
        this.dataTable.paginator = this.paginator;
      },

      error: (error) => {
        console.log('')
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  callNewOffice() {
    this.router.navigate(['/newOffice']);
  }
}
