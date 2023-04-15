import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscritorioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public teste(req: any){
    return this.httpClient.post('/recebidos/escritorio/newOffices/10', req).pipe(
      map((res: any) => res as any)
    )
  }

}
