import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';
import { EmptyExpr } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  logueado : boolean = false;
  
  
  user = {
    idUsuario: 0,
    usuario: "",
    password: "",
  };




    constructor(private router: Router,private api: ApiService,private storage: Storage) {
      
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
        console.log('Usuario ya ha iniciado sesión:', userData);
        console.log(this.user)

        this.storage.set('usuariologin', this.user).then((data) => {
            let navigationExtras: NavigationExtras = { state: { user: this.user } };
            this.router.navigate(['/home'], navigationExtras);
            
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
  
      
    // funcion ir a pagina home
    goToHome() {
      this.api.getUsuario().subscribe((usuarios) => {
        const usuario = usuarios.find((user) => user.nombreUsuario === this.user.usuario);
  
        if (usuario && usuario.contraseña === this.user.password) {
          // Extraer solo la ID del usuario
          this.user.idUsuario = usuario.idUsuario;
  
          // Guarda los datos de usuario en el almacenamiento
          this.storage.set('usuariologin', this.user).then((data) => {
            let navigationExtras: NavigationExtras = { state: { user: this.user } };
  
            if (usuario.categoria === 1) {
              // Categoria 1: redirigir a /home
              this.router.navigate(['/home'], navigationExtras);
            } else if (usuario.categoria === 2) {
              // Categoria 2: redirigir a /docente
              this.router.navigate(['/docente'], navigationExtras);
            }
          });
        } else {
          console.log('Credenciales incorrectas');
        }
      });
    }

    
   
  
    
  
    // Función para ir a la página de recuperación
    goToRecuperar() {
      this.router.navigate(['/recuperar']);
    }

    
}

  

