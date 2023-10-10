import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //inicializacion de user 
  user: any;
  state: any; 
  
  codigoQR: string | null = null;

  
  //está utilizando el operador ?.. Esto se conoce como "operador de encadenamiento opcional". 
  //Lo que hace es verificar si this.router.getCurrentNavigation() devuelve un valor distinto de null o 
  constructor(private activeroute: ActivatedRoute, private router: Router,private apiService: ApiService) {   
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user=this.state.user
      console.log(this.user);
    })
  }

  generarCodigoQR() {
    const texto = 'Hello world'; // Texto que deseas codificar en el código QR

    this.apiService.createQRCode(texto).subscribe((data: Blob) => {
      const imageUrl = URL.createObjectURL(data);
      this.codigoQR = imageUrl; // Asigna la URL de la imagen a la variable
    });
  }
  ngOnInit() {
    
  }
}
