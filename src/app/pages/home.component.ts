import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatListSubheaderCssMatStyler, MatList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-adm-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [MatSidenavContainer, MatSidenav, MatListSubheaderCssMatStyler, MatList, MatListItem, MatIcon, MatListItemIcon, MatListItemTitle, MatDivider, MatSidenavContent]
})
export class HomeComponent {
  options = this.formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  listOfficesSession() {
    this.router.navigate(['/office']);
  }

  listReceiptSession() {
    this.router.navigate(['/receipt']);
  }

  newReceiptSession() {
    this.router.navigate(['/receipt/new']);
  }

  editStatusSession() {
    this.router.navigate(['/receipt/update']);
  }

  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.removeItem('userLevel');
        sessionStorage.removeItem('institutionID');
        sessionStorage.removeItem('officeID');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }
}
