import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableReceitModel } from 'src/app/shared/interface/table-receipt.model';
import { MatPaginator } from '@angular/material/paginator';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-receipt',
  templateUrl: './list-receipt.component.html',
  styleUrls: ['./list-receipt.component.scss'],
})
export class ListReceiptsComponent implements OnInit {
  displayedColumns = ['id', 'responsavel', 'valor', 'status', 'acao'];
  dataTable: any;
  pageHeader: string = 'Listagem Recibos';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private receiptService: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tableDataService();
  }

  tableDataService() {
    const req = sessionStorage.getItem('institutionID');
    this.receiptService.ListReceipts(req).subscribe({
      next: (res) => {
        this.dataTable = new MatTableDataSource<TableReceitModel>(res);
        this.dataTable.paginator = this.paginator;
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

  callEditReceipt(id: number) {
    this.router.navigate(['receipt/edit', id]);
  }

  backToLastPage() {
    history.back();
  }

  createNewReceipt() {
    this.router.navigate(['receipt/new']);
  }
}
