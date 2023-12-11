import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router,NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}
  logueado: boolean = false;
  user = {
    idUsuario: 0,
    usuario: "",
    password: "",
    email: "",
    categoria: 0,
  };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.storage.create();

    return this.storage.get('usuariologin').then((userData) => {
      if (userData) {
        this.logueado = true;
        this.user.idUsuario = userData.idUsuario;
        this.user.usuario = userData.usuario;
        this.user.password = userData.password;
        this.user.email = userData.email; 
        this.user.categoria = userData.categoria;

        this.storage.set('usuariologin', this.user).then(() => {
          let navigationExtras: NavigationExtras = { state: { user: this.user } };

          // Utiliza navigateByUrl en lugar de navigate
          if (userData.categoria === 1) {
            this.router.navigateByUrl('/home', navigationExtras);
          } else if (userData.categoria === 2) {
            this.router.navigateByUrl('/docente', navigationExtras);
          }
        });

        // Devuelve true para permitir la navegación
        return true;
      } else {
        console.log('Usuario no ha iniciado sesión. Redirigiendo a la página de inicio de sesión.');
        // Devuelve un UrlTree para redirigir a la página de inicio de sesión
        return this.router.parseUrl('/login');
      }
    });
  }
}