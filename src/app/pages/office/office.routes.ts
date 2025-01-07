import { Route } from '@angular/router';
import { ListOfficesComponent } from './list-office/list-office.component';
import { NewOfficeComponent } from './new-office/new-office.component';
import { EditOfficeComponent } from './edit-office/edit-office.component';

export const OFFICE_ROUTES: Route[] = [
  { path: '', component: ListOfficesComponent },
  { path: 'new', component: NewOfficeComponent },
  { path: 'edit', component: EditOfficeComponent },
];
