import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { HomePage } from './home.page';
import { ApiService } from '../service/api.service';  // Asegúrate de importar ApiService

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        IonicStorageModule.forRoot(),
        HttpClientModule,  // Agrega HttpClientModule
      ],
      providers: [ApiService],  // Agrega ApiService como proveedor
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
