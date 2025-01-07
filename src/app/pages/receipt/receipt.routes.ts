import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { ListReceiptsComponent } from './list-receipt/list-receipt.component';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';
import { EditReceiptComponent } from './edit-receipt/edit-receipt.component';
import { UpdateReceiptComponent } from './update-receipt/update-receipt.component';

export const RECEIPT_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { userLevel: 1 },
    component: ListReceiptsComponent,
  },
  { path: 'new', component: NewReceiptComponent },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    data: { userLevel: 1 },
    component: EditReceiptComponent
  },
  { path: 'update', component: UpdateReceiptComponent },
];
