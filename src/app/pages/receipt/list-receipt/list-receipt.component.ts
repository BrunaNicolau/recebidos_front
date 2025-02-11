import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableReceitModel } from 'src/app/shared/interface/table-receipt.model';
import { MatPaginator } from '@angular/material/paginator';
import { ReceiptServiceService } from 'src/app/service/receipt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-list-receipt',
    templateUrl: './list-receipt.component.html',
    styleUrls: ['./list-receipt.component.scss'],
    imports: [ToolbarComponent, MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatMiniFabButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatButton]
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
      error: (e) => {
        this.snackBar.open(e.error.message, '', {
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
