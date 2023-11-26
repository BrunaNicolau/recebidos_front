import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(req: any) {
    return this.httpClient
      .post('/recebidos/login', req)
      .pipe(map((res: any) => res as any));
  }

  public logout() {
    return this.httpClient
      .get('/recebidos/logout')
      .pipe(map((res: any) => res as any));
  }
}
