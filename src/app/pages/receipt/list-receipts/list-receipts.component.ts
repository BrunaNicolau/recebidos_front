import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableReceitModel } from 'src/app/shared/interface/table-receipt.model';
import { MatPaginator } from '@angular/material/paginator';
import { ReceiptServiceService } from 'src/app/service/receipt-service.service';

@Component({
  selector: 'app-list-receipts',
  templateUrl: './list-receipts.component.html',
  styleUrls: ['./list-receipts.component.scss'],
})
export class ListReceiptsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['id', 'responsavel', 'valor', 'status', 'acao'];
  dataTable: any;
  res: any;

  constructor(
    private router: Router,
    private receiptServices: ReceiptServiceService
  ) {}

  ngOnInit() {
    this.tableDataService();
  }

  tableDataService() {
    //TODO: montar chamada de servico
    const req = 1;
    this.receiptServices.ListReceipts(req).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.res = [
      { id: 1, responsavel: 'teste', valor: 15, status: 'teste' },
      { id: 2, responsavel: 'teste', valor: 15, status: 'teste' },
      { id: 3, responsavel: 'teste', valor: 15, status: 'teste' },
    ];
    this.dataTable = new MatTableDataSource<TableReceitModel>(this.res);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  backToLastPage() {
    this.router.navigate(['/adm']);
  }

  createNewReceipt() {
    // TODO: por a rota
    // this.router.navigate(['/adm']);
  }
}
