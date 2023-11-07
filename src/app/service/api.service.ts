import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  
  getUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/lista_usuario')
    .pipe(retry(3));
  }
  postUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/crear_usuario', usuario)
    .pipe(retry(3));
  }
  
}