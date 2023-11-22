import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};
  state: any;
  mostrarBotonConfirmar: boolean = false;
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = this.state.user;
    });
  }

  async ngOnInit() {
    // Inicializa el almacenamiento local
    await this.storage.create();
  }

  cerrarSesion() {
    // Elimina los datos de usuario del almacenamiento local
    this.storage.remove('usuariologin').then(() => {
      // Redirige al usuario a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    });
  }

  async escanearCodigoQR() {
    try {
      // Instalar servicios de escaneo antes de escanear
      this.instalarServiciosEscaneo();
  
      // Ahora escanea el código QR
      const result = await BarcodeScanner.scan();
      console.log('Código escaneado:', result);
  
      // Puedes procesar el resultado como desees.
      // Por ejemplo, puedes almacenar el resultado en una variable o ejecutar alguna lógica específica.
  
      // Después de escanear, muestra el botón de confirmar asistencia
      this.mostrarBotonConfirmar = true;
    } catch (error) {
      console.error('Error al escanear código QR:', error);
    }
  }

  async instalarServiciosEscaneo() {
    try {
      // Instalar servicios de escaneo de Google
      BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Servicios de escaneo instalados correctamente');
    } catch (error) {
      console.error('Error al instalar servicios de escaneo:', error);
      throw error; // Propaga el error para que pueda ser manejado por la función llamadora
    }
  }
  confirmarAsistencia() {
    // Implementa la lógica de confirmación de asistencia aquí
    console.log('Asistencia confirmada');
    alert("presente")
  }
}
