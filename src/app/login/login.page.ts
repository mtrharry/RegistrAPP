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
  logueado: any[] = [];
  state=[];
  user={
    usuario:"",
    password:""
    };
 

    constructor(private router: Router,private api: ApiService,private storage: Storage) {
      
    }
    async ngOnInit() {
    // Inicializa el almacenamiento
    await this.storage.create();

    // Verifica si hay datos de usuario almacenados
    const storedUser = await this.storage.get('usuariologin');

    if (storedUser) {
      // Si hay datos de usuario almacenados, redirige directamente a la página de inicio
      let navigationExtras: NavigationExtras = { state: { user: storedUser } };
      this.router.navigate(['/home'], navigationExtras);
    }
  }
      
    // funcion ir a pagina home
    goToHome() {
      this.api.getUsuario().subscribe((usuarios) => {
        const usuario = usuarios.find((user) => user.nombreUsuario === this.user.usuario);
        
        
        if (usuario && usuario.Contraseña === this.user.password) {
          // Guarda los datos de usuario en el almacenamiento
          this.storage.set('usuariologin', this.user).then((data) => {
            let navigationExtras: NavigationExtras = { state: { user: this.user } };
            this.router.navigate(['/home'], navigationExtras);
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

  

