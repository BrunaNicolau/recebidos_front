import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableReceitModel } from 'src/app/shared/interface/table-receipt.model';
import { MatPaginator } from '@angular/material/paginator';
import { ReceiptServiceService } from 'src/app/service/receipt-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-receipts',
  templateUrl: './list-receipts.component.html',
  styleUrls: ['./list-receipts.component.scss'],
})
export class ListReceiptsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['id', 'responsavel', 'valor', 'status', 'acao'];
  dataTable: any;

  constructor(
    private router: Router,
    private receiptServices: ReceiptServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tableDataService();
  }

  tableDataService() {
    const req = 1;
    this.receiptServices.ListReceipts(req).subscribe({
      next: (res) => {
        this.dataTable = new MatTableDataSource<TableReceitModel>(res);
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

  callEditReceipt() {
    this.router.navigate(['/editReceipt']);
  }

  backToLastPage() {
    this.router.navigate(['/adm']);
  }

  createNewReceipt() {
    this.router.navigate(['/newReceipt']);
  }
}
