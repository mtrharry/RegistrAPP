import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //inicializacion de user 
  user: any = {};
  state: any; 
  

  //está utilizando el operador ?.. Esto se conoce como "operador de encadenamiento opcional". 
  //Lo que hace es verificar si this.router.getCurrentNavigation() devuelve un valor distinto de null o 
  constructor(private activeroute: ActivatedRoute, private router: Router,private storage: Storage ) {   
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user=this.state.user
      
    }) 
  }
  async ngOnInit() {
    // Inicializa el almacenamiento local
    await this.storage.create();

    // Resto del código de ngOnInit()
  }

  cerrarSesion() {
    // Elimina los datos de usuario del almacenamiento local
    this.storage.remove('usuariologin').then(() => {
      // Redirige al usuario a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    });
  }
  
  
}