import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {
  MatFormField,
  MatLabel,
  MatError,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIcon,
    MatSuffix,
    MatCheckbox,
    MatButton
  ],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  hidePassword: Boolean = true;
  showLoginError: Boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  logar(req: any) {
    this.authService.login(req).subscribe({
      next: (res) => {
        sessionStorage.setItem('userLevel', res.profile);
        sessionStorage.setItem('institutionID', res.institution);
        sessionStorage.setItem('officeID', res.officeid);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.showLoginError = true;
      },
    });
  }
}
