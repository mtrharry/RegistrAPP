import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const barcodeScannerSpy = jasmine.createSpyObj('BarcodeScanner', ['scan', 'installGoogleBarcodeScannerModule']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['registrarAsistencia']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: BarcodeScanner, useValue: barcodeScannerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        Storage,
      ],
    });

    const fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call escanearCodigoQR method and show information', async () => {
    const mockScanResult: ScanResult = {
      barcodes: [{ displayValue: 'Asignatura - ha.docente@duocuc.cl' }],
    };

    (component as any).result = mockScanResult;
    (BarcodeScanner.scan as jasmine.Spy).and.returnValue(Promise.resolve(mockScanResult));

    await component.escanearCodigoQR();

   
    expect((component as any).mostrarBotonConfirmar).toBe(true);
    expect(apiServiceSpy.registrarAsistencia).toHaveBeenCalled();
  });

  it('should call confirmarAsistencia method', async () => {
    const mockScanResult: ScanResult = {
      barcodes: [{ displayValue: 'Asignatura - ha.docente@duocuc.cl' }],
    };

    
    (component as any).result = mockScanResult;
    (BarcodeScanner.scan as jasmine.Spy).and.returnValue(Promise.resolve(mockScanResult));

    
    await component.confirmarAsistencia();

    
    expect((component as any).mostrarBotonConfirmar).toBe(true);
    expect(apiServiceSpy.registrarAsistencia).toHaveBeenCalled();
  });
});
