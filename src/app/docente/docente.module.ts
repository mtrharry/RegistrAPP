import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocentePageRoutingModule } from './docente-routing.module';

import { DocentePage } from './docente.page';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode'

@NgModule({
  imports: [MatDialogModule,QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DocentePageRoutingModule
  ],
  declarations: [DocentePage]
})
export class DocentePageModule {}
