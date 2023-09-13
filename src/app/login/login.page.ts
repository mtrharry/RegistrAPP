import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
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
 
    constructor(private router: Router) {  }
    // funcion ir a pagina home
    goToHome(){
      let navigationExtras: NavigationExtras = {state: {user: this.user}};

      this.router.navigate(['/home'],navigationExtras);
    }  

    // funcion ir a pagina de recuperacion
    goToRecuperar(){
      this.router.navigate(['/recupera']);
      
    }  
    
    
    ngOnInit(): void {
    
  };
    
    
  }
  

