import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  apiURL = 'https://11fxc72v-8000.brs.devtunnels.ms/api';
  //apiURL = 'http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }

  
  getUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/lista_usuario/')
    .pipe(retry(3));
  }

  getAsignaturasDocente(idDocente: number): Observable<any> {
    const url = `${this.apiURL}/asignaturas_docente/${idDocente}/`;
    return this.http.get(url);
  }
  
  registrarAsistencia(data: any): Observable<any> {
    const url = `${this.apiURL}/escanear_qr/`;
    return this.http.post(url, data);
  }
}