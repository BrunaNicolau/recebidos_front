import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListReceiptsComponent } from './list-receipt/list-receipt.component';
import { EditReceiptComponent } from './edit-receipt/edit-receipt.component';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';
import { UpdateReceiptComponent } from './update-receipt/update-receipt.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/shared/ngMaterial/ngMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  { path: '', component: ListReceiptsComponent },
  { path: 'new', component: NewReceiptComponent },
  { path: 'edit', component: EditReceiptComponent },
  { path: 'update', component: UpdateReceiptComponent },
];

@NgModule({
  declarations: [
    ListReceiptsComponent,
    EditReceiptComponent,
    NewReceiptComponent,
    UpdateReceiptComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    
  ],
})
export class ReceiptModule {}
