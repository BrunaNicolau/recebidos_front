import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.authService.login(req).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userLevel', res.user.profile);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.showLoginError = true;
      },
    });
  }

  // email: 'a@a.com.br';
  // id: 1;
  // institution: 1;
  // password: 'adm@2022';
  // profile: 1;
  // username: 'adm';
}
