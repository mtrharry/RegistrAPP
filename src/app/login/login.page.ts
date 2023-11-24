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

  }

  async ngOnInit() {
    // Inicializa el almacenamiento
    await this.storage.create();

    this.storage.get('usuariologin').then((userData) => {
      if (userData) {
        // Hay datos almacenados, el usuario ha iniciado sesión anteriormente
        this.logueado = true;
        this.user.idUsuario = userData.idUsuario;
        this.user.usuario = userData.usuario;
        this.user.password = userData.password;
        this.user.email = userData.email; 
        this.user.categoria = userData.categoria;
        

        this.storage.set('usuariologin', this.user).then((data) => {
          let navigationExtras: NavigationExtras = { state: { user: this.user } };
          if (userData.categoria === 1) {
            this.router.navigate(['/home'], navigationExtras);
          } else if (userData.categoria === 2) {
            this.router.navigate(['/docente'], navigationExtras);
          }
        });
      } else {
        // No hay datos almacenados, el usuario no ha iniciado sesión
        this.logueado = false;
        console.log('Usuario no ha iniciado sesión');
      }
    });

    this.api.getUsuario().subscribe((usuarios) => {
      console.log('Lista de usuarios:', usuarios);
    });
  }

  goToHome() {
    this.api.getUsuario().subscribe((usuarios) => {
      const usuario = usuarios.find((user) => user.nombreUsuario === this.user.usuario);

      if (usuario && usuario.contraseña === this.user.password) {
        this.user.idUsuario = usuario.idUsuario;
        this.user.email = usuario.email;
        this.user.categoria = usuario.categoria; 

        this.storage.set('usuariologin', this.user).then((data) => {
          let navigationExtras: NavigationExtras = { state: { user: this.user } };

          if (usuario.categoria === 1) {
            this.router.navigate(['/home'], navigationExtras);
          } else if (usuario.categoria === 2) {
            this.router.navigate(['/docente'], navigationExtras);
          }
        });
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }
}
