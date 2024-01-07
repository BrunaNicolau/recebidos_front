import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home.component';
import { AuthGuard } from './service/auth.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: '**', component: ErrorPageComponent},
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
      import('./pages/office/office.module').then((m) => m.OfficeModule),
  },
  {
    path: 'receipt',
    loadChildren: () =>
      import('./pages/receipt/receipt.module').then((m) => m.ReceiptModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
