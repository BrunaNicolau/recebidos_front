import { Component, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

@Injectable()
export class LoginComponent {
  usuario = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required]);
  lembrar = new FormControl('');

  constructor(
    private router: Router,
    // private testeService: EscritorioService
  ) {}

  logar() {
    console.log('criar o serviço de autenticação');
    const req = { nome: 'bruna' };
    // this.testeService.teste(req).subscribe({
    //   next: (resp) => {
    //     console.log(resp);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this.router.navigate(['/adm']);
  }
}
