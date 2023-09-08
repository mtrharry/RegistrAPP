import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  goToLogin(){
      this.navCtrl.navigateForward('/login');
      
    } 
  ngOnInit() {
  }

}
