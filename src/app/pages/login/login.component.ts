import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  hidePassword: Boolean = true;
  showLoginError: Boolean = false;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false, Validators.required],
    });
  }

  logar(req: any) {
    this.authService.authService(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.snackBar.open(error.message, '', { duration: 5000 });
        //TODO: Mostrar erro no form
        this.showLoginError = true;
      },
    });
  }
}
