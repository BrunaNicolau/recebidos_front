import { Route } from '@angular/router';




export const OFFICE_ROUTES: Route[] = [
  { path: '', loadComponent: () => import('./list-office/list-office.component').then(m => m.ListOfficesComponent) },
  { path: 'new', loadComponent: () => import('./new-office/new-office.component').then(m => m.NewOfficeComponent) },
  { path: 'edit', loadComponent: () => import('./edit-office/edit-office.component').then(m => m.EditOfficeComponent) },
];
