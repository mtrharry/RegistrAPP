import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  user={
    usuario:"",
    password:""
    };
 
    recordarUsuario: boolean = false;
    errorMensaje: string = "";
    constructor(private router: Router,private api: ApiService,private storage: Storage) {
      // Llama al método create para crear la base de datos
    this.storage.create().then(() => {
      // El resto del constructor
      this.recordarUsuario = this.recordarUsuario === true;
      if (this.recordarUsuario) {
        // Si se recuerda al usuario, cargar el nombre de usuario y contraseña guardados
        this.storage.get('user').then((user) => {
          this.user = user;
        });
      }
    });
    }
      
      ngOnInit() {
     
      }
      
    // funcion ir a pagina home
    goToHome() {
      this.api.getUsuario().subscribe(
        (usuarios) => {
          const usuario = usuarios.find((user) => user.nombreUsuario === this.user.usuario);
          
          if (usuario && usuario.Contraseña === this.user.password) {
  
            let navigationExtras: NavigationExtras = { state: { user: this.user } };
            this.router.navigate(['/home'], navigationExtras);
          } else {
            this.errorMensaje = "Usuario o contraseña incorrectos"; 
          }
        },
        
      );
  }
    
  
    // Función para ir a la página de recuperación
    goToRecuperar() {
      this.router.navigate(['/recuperar']);
    }
  }
    

  

