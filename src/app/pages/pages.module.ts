import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/ngMaterial/ngMaterial.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EscritorioService } from '../service/escritorio.service';
import { ListOfficesComponent } from './list-offices/list-offices.component';
import { NewOfficeComponent } from './new-office/new-office.component';

@NgModule({
  declarations: [
    AdmHomeComponent,
    LoginComponent,
    ListOfficesComponent,
    NewOfficeComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule
  ], 
  providers: [
    EscritorioService
  ]
})
export class PagesModule { }
