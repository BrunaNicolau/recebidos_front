import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
        localStorage.removeItem('userLevel')
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
      },
    });
  }
}
