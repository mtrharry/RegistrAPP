import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  logueado: boolean = false;

  user = {
    idUsuario: 0,
    usuario: "",
    password: "",
    email: "",
    categoria: 0,
};

  constructor(private router: Router, private api: ApiService, private storage: Storage) {
    this.router = router;
  }

  get publicRouter(): Router {
    return this.router;
  }

  async ngOnInit() {
    // Inicializa el almacenamiento
    await this.storage.create();

    this.api.getUsuario().subscribe((usuarios) => {
      console.log('Lista de usuarios:', usuarios);
    });
  }

  Validacion() {
    this.api.getUsuario().subscribe((usuarios) => {
      const usuario = usuarios.find((user) => user.nombreUsuario === this.user.usuario);

      if (usuario && usuario.contraseña === this.user.password) {
        this.user.idUsuario = usuario.idUsuario;
        this.user.email = usuario.email;
        this.user.categoria = usuario.categoria;

        this.storage.set('usuariologin', this.user).then((data) => {
          if (usuario.categoria === 1) {
            this.goToHome();
          } else if (usuario.categoria === 2) {
            this.goToDocente();
          }
        });
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

  goToHome() {
    let navigationExtras: NavigationExtras = { state: { user: this.user } };
    this.router.navigate(['/home'], navigationExtras);
  }

  goToDocente() {
    let navigationExtras: NavigationExtras = { state: { user: this.user } };
    this.router.navigate(['/docente'], navigationExtras);
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }
}
