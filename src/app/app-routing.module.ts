import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListOfficesComponent } from './pages/office/list-offices/list-offices.component';
import { NewOfficeComponent } from './pages/office/new-office/new-office.component';
import { EditOfficeComponent } from './pages/office/edit-office/edit-office.component';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'adm', component: HomeComponent},
  {path: 'listOffices', component: ListOfficesComponent},
  {path: 'newOffice', component: NewOfficeComponent},
  {path: 'editOffice', component: EditOfficeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
