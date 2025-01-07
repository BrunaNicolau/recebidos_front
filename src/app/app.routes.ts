import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home.component';
import { AuthGuard } from './service/auth.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
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
  { path: '**', component: ErrorPageComponent },
];
