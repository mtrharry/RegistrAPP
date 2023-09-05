import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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
 
    constructor(private navCtrl: NavController ) {
      
    }
    goToHome(){
      this.navCtrl.navigateForward('/home/' + this.user.usuario);
      
    }  
    
    
    ngOnInit(): void {
    
  };
    
    
  }
  

