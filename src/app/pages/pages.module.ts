import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/ngMaterial/ngMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListOfficesComponent } from './office/list-offices/list-offices.component';
import { NewOfficeComponent } from './office/new-office/new-office.component';
import { EditOfficeComponent } from './office/edit-office/edit-office.component';
import { OfficeServices } from '../service/office-services.service';
import { LoginComponent } from './login/login.component';
import { ListReceiptsComponent } from './receipt/list-receipts/list-receipts.component';
import { EditReceiptComponent } from './receipt/edit-receipt/edit-receipt.component';
import { NewReceiptComponent } from './receipt/new-receipt/new-receipt.component';
import { UpdateReceiptComponent } from './receipt/update-receipt/update-receipt.component';
import { HomeComponent } from './home.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    ListOfficesComponent,
    NewOfficeComponent,
    EditOfficeComponent,
    ListReceiptsComponent,
    EditReceiptComponent,
    NewReceiptComponent,
    UpdateReceiptComponent
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
