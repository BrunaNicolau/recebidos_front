import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';





export const RECEIPT_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { userLevel: 1 },
    loadComponent: () => import('./list-receipt/list-receipt.component').then(m => m.ListReceiptsComponent),
  },
  { path: 'new', loadComponent: () => import('./new-receipt/new-receipt.component').then(m => m.NewReceiptComponent) },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    data: { userLevel: 1 },
    loadComponent: () => import('./edit-receipt/edit-receipt.component').then(m => m.EditReceiptComponent)
  },
  { path: 'update', loadComponent: () => import('./update-receipt/update-receipt.component').then(m => m.UpdateReceiptComponent) },
];
