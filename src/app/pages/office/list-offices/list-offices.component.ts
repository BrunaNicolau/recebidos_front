import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office-services.service';
import { TableOfficeModel } from 'src/app/shared/interface/table-office.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.scss'],
})
export class ListOfficesComponent implements OnInit {
  displayedColumns = ['id', 'responsavel', 'status', 'acao'];
  dataTable: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private OfficeServices: OfficeServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.callTableDataService();
  }

  callTableDataService() {
    //TODO: ajustar essa req
    const req = 3;
    this.OfficeServices.ListOffices(req).subscribe({
      next: (res) => {
        if (!res) {
          this.snackBar.open('Erro ao pesquisar escritorio.', '', {
            duration: 5000,
          });
        } else {
          this.dataTable = new MatTableDataSource<TableOfficeModel>(res);
          this.dataTable.paginator = this.paginator;
        }
      },
      error: (error) => {
        this.snackBar.open(error.message, '', {
          duration: 5000,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  callEditOffice() {
    this.router.navigate(['/editOffice']);
  }

  callNewOffice() {
    this.router.navigate(['/newOffice']);
  }

  backToLastPage() {
    this.router.navigate(['/adm']);
  }
}
