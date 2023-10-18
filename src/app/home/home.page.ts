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
  
  

  
  //está utilizando el operador ?.. Esto se conoce como "operador de encadenamiento opcional". 
  //Lo que hace es verificar si this.router.getCurrentNavigation() devuelve un valor distinto de null o 
  constructor(private activeroute: ActivatedRoute, private router: Router,private apiService: ApiService) {   
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user=this.state.user
      console.log(this.user);
    })
  }

  
  ngOnInit() {
    
  }
}
