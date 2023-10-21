
import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService, private storage: Storage) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.api.getUsuario().pipe(
      map((usuarios) => {
        const user = usuarios.find((user) => user.nombreUsuario === username && user.Contraseña === password);
        return !!user; // Devuelve true si el usuario se encuentra
      }),
      catchError((error) => {
        console.error(error);
        return of(false); // Devuelve false en caso de error
      })
    );
  }
}


