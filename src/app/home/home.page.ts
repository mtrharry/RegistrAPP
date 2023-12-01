import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any = {};
  state: any;
  mostrarBotonConfirmar: boolean = false;
  result: any | ScanResult;
  
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private apiService: ApiService
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
      await this.instalarServiciosEscaneo();
  
      // Ahora escanea el código QR
      this.result = await BarcodeScanner.scan();
      
  
      // Almacena la información del escaneo en una variable
      const { usuario, fecha, hora, asignatura, correoDocente } = this.obtenerAsignatura(this.result);
      const informacionEscaneo = {
        usuario: this.user.usuario,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        asignatura: asignatura,
      };
  
      // Muestra la información en un alert
      this.mostrarInformacionEscaneo(informacionEscaneo);
  
      // Después de escanear, muestra el botón de confirmar asistencia
      this.mostrarBotonConfirmar = true;
  
      // Genera el enlace mailto
      const mailtoLink = this.generarLinkMailTo(correoDocente, usuario, asignatura, informacionEscaneo.fecha, informacionEscaneo.hora);
      
      // Abre el enlace en una nueva pestaña o ventana del navegador
      window.open(mailtoLink, '_blank');
  
    } catch (error) {
      console.error('Error al escanear código QR:', error);
    }
  }

  async instalarServiciosEscaneo() {
    try {
      // Instalar servicios de escaneo de Google
      BarcodeScanner.installGoogleBarcodeScannerModule();
     
    } catch (error) {
      console.error('Error al instalar servicios de escaneo:', error);
      throw error; // Propaga el error para que pueda ser manejado por la función llamadora
    }
  }

  obtenerAsignatura(resultado: any): { usuario: string, fecha: string, hora: string, asignatura: string, correoDocente: string } {
  const informacion = { usuario: this.user.usuario, fecha: '', hora: '', asignatura: 'No disponible', correoDocente: 'No disponible' };
  
  if (
    resultado &&
    resultado.barcodes &&
    resultado.barcodes.length > 0 &&
    resultado.barcodes[0].displayValue
  ) {
    const displayValue: string = resultado.barcodes[0].displayValue; // Especifica el tipo de displayValue

    // Separar la asignatura y el correo utilizando el formato "arquitectura - M13 - 003D - ha.docente@duocuc.cl"
    const partes: string[] = displayValue.split('-').map(part => part.trim()); // Especifica el tipo de partes

    // Tomamos la parte antes del último guión como asignatura
    informacion.asignatura = partes.slice(0, -1).join(' - ');

    // Tomamos la última parte como correoDocente
    informacion.correoDocente = partes.slice(-1)[0];
  }

  return informacion;
}
  

mostrarInformacionEscaneo(informacionEscaneo: { usuario: string, fecha: string, hora: string, asignatura: string, correoDocente?: string }) {
  // Construye el mensaje para el alert
  let mensaje =
    `Usuario: ${informacionEscaneo.usuario}\n` +
    `Fecha: ${informacionEscaneo.fecha}\n` +
    `Hora: ${informacionEscaneo.hora}\n` +
    `Asignatura: ${informacionEscaneo.asignatura}`;

  // Agrega la información del correo del docente si está disponible
  if (informacionEscaneo.correoDocente) {
    mensaje += ` - Correo Docente: ${informacionEscaneo.correoDocente}`;
  }

  // Muestra un alert con la información del escaneo
  alert(mensaje);
}
  
  confirmarAsistencia() {
    // Implementa la lógica de confirmación de asistencia aquí
    
    
    // Verifica si result está definido antes de usarlo
    if (this.result) {
      
      const { usuario, fecha, hora, ...asignaturaInfo } = this.obtenerAsignatura(this.result);
  
      const informacionEscaneo = {
        usuario: this.user.usuario,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        ...asignaturaInfo, // Utiliza el operador spread para incluir las propiedades de asignatura
      };
  
      // Llama al servicio para registrar la asistencia
      this.apiService.registrarAsistencia(informacionEscaneo).subscribe(
        (response) => {
          // Maneja la respuesta del servidor si es necesario
          
          alert('Asistencia registrada correctamente:');
        },
        (error) => {
          // Maneja los errores en caso de que la solicitud falle
          console.error('Error al registrar asistencia:', error);
          alert('Error al registrar asistencia. Consulta la consola para más detalles.');
        }
      );
  
      // Muestra un alert con la información del escaneo
      this.mostrarInformacionEscaneo(informacionEscaneo);
  
      // Después de escanear, muestra el botón de confirmar asistencia
      this.mostrarBotonConfirmar = true;
    } else {
      alert('Error: result no está definido');
    }
  }

  generarLinkMailTo(correoDocente: string, usuario: string, asignatura: string, fecha: string, hora: string): string {
    const asunto = 'Confirmación de Asistencia';
    const cuerpo = `Usuario: ${usuario}\nAsignatura: ${asignatura}\nFecha: ${fecha}\nHora: ${hora}`;
  
    // Construir el enlace mailto
    const mailtoLink = `mailto:${correoDocente}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  
    return mailtoLink;
  }

}
