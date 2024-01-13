import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeServices } from 'src/app/service/office.service';
import { TableOfficeModel } from 'src/app/shared/interface/table-office.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunsData } from 'src/app/shared/utils/ComunsData';

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.scss'],
})
export class ListOfficesComponent implements OnInit {
  displayedColumns = ['id', 'responsavel', 'status', 'acao'];
  dataTable: any;
  pageHeader: string = 'Listagem Escritorios';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private OfficeServices: OfficeServices,
    private snackBar: MatSnackBar,
    private officeDTO: ComunsData
  ) {}

  ngOnInit() {
    this.tableDataService();
  }

  tableDataService() {
    const req = sessionStorage.getItem('institutionID');
    this.OfficeServices.officesList(req).subscribe({
      next: (res) => {
        if (!res) {
          this.snackBar.open('Erro ao listar sscritórios.', '', {
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

  callEditOffice(id: any) {
    this.officeDTO.setReceiptID(id);
    this.router.navigate(['office/edit']);
  }

  callNewOffice() {
    this.router.navigate(['office/new']);
  }

  backToLastPage() {
    history.back();
  }
}
