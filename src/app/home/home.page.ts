import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //inicializacion de user 
  user: string | null = null; 

  //para capturar el valor del parámetro 'user' de la URL y lo almacena en la variable this.user
  constructor(private route: ActivatedRoute) {   
  }
  // Utiliza el método get('user') en el mapa de parámetros para obtener el valor del parámetro llamado 'user' Asigna el valor del parámetro 'user'
  // en el componente user
  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
  }
}
