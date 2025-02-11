import { Component, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass'],
    imports: [MatToolbar, MatIconButton, MatIcon]
})
export class ToolbarComponent {
  readonly pageTitle = input<string>();

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
