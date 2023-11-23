import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../service/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  user: any = {};
  asignaturas: any[] = [];
  state: any; 

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {
    this.activeroute.queryParams.subscribe(params => {
      this.state = this.router.getCurrentNavigation()?.extras.state;
      this.user = this.state.user;
    });
    this.api.getUsuario().subscribe((usuarios) => {
      console.log('Lista de usuarios:', usuarios);
    });
  }

  async ngOnInit() {
    // Inicializa el almacenamiento local
    await this.storage.create();

    // Obtener las asignaturas del docente
    this.api.getAsignaturasDocente(this.user.idUsuario).subscribe((data: any) => {
      this.asignaturas = data;
    });
  }

  cerrarSesion() {
    // Elimina los datos de usuario del almacenamiento local
    this.storage.remove('usuariologin').then(() => {
      // Redirige al usuario a la página de inicio de sesión (login)
      this.router.navigate(['/login']);
    });
  }

  public myAngularxQrCode: string = '';
  generarQR(asignatura: any) {
    // Genera el código QR con los datos de la asignatura y el correo electrónico
    const qrData = `${asignatura.nombre} - ${asignatura.sigla} - ${asignatura.seccion} - ${this.user.email}`;
    this.myAngularxQrCode = qrData;
    console.log(this.myAngularxQrCode)

    // Opcional: También puedes generar la URL del código QR
    const qrCodeURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.myAngularxQrCode}`);
    // Puedes utilizar qrCodeURL según tus necesidades (por ejemplo, para descargar el código QR).

    // Aquí puedes agregar lógica adicional, como enviar el código QR a la base de datos.
  }
}

