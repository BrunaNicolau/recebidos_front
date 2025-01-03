import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass'],
    standalone: false
})
export class ToolbarComponent {
  @Input() pageTitle: string;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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
