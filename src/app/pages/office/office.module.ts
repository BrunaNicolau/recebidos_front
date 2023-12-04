import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfficesComponent } from './list-office/list-office.component';
import { NewOfficeComponent } from './new-office/new-office.component';
import { EditOfficeComponent } from './edit-office/edit-office.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/shared/ngMaterial/ngMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { OfficeServices } from 'src/app/service/office.service';

const routes: Routes = [
  { path: '', component: ListOfficesComponent },
  { path: 'new', component: NewOfficeComponent },
  { path: 'edit', component: EditOfficeComponent },
];

@NgModule({
  declarations: [ListOfficesComponent, NewOfficeComponent, EditOfficeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [OfficeServices]
})
export class OfficeModule {}
