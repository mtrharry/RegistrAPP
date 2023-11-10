import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.storage.create();
    // Verifica si hay datos almacenados en 'usuariologin'
    return this.storage.get('usuariologin').then((userData) => {
      
      if (userData) {
        // Hay datos almacenados, el usuario ha iniciado sesión anteriormente
        console.log('Usuario ha iniciado sesión:', userData);
        return true;
      } else {
        // No hay datos almacenados, el usuario no ha iniciado sesión
        console.log('Usuario no ha iniciado sesión. Redirigiendo a la página de inicio de sesión.');
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}


