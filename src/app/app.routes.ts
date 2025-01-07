import { Routes } from '@angular/router';


import { AuthGuard } from './service/auth.guard';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'office',
    canActivate: [AuthGuard],
    data: { userLevel: 1 },
    loadChildren: () =>
      import('./pages/office/office.routes').then((m) => m.OFFICE_ROUTES),
  },
  {
    path: 'receipt',
    loadChildren: () =>
      import('./pages/receipt/receipt.routes').then((m) => m.RECEIPT_ROUTES),
  },
  { path: '**', loadComponent: () => import('./pages/error-page/error-page.component').then(m => m.ErrorPageComponent) },
];
