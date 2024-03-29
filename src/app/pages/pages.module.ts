import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/ngMaterial/ngMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OfficeServices } from '../service/office.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';
import { NgxMaskModule } from 'ngx-mask';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,    
    NgxMaskModule.forRoot()
  ], 
  providers: [
    OfficeServices
  ]
})
export class PagesModule { }
