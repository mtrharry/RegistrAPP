import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  private apiURL = 'https://chart.googleapis.com/chart';
  constructor(private http: HttpClient) { }
  private contadorEscaneos = 0;

  createQRCode(url: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('cht', 'qr');
    body.set('chl', url);
    body.set('chs', '200x200');
    body.set('chld', 'L');

    return this.http.post(this.apiURL, body.toString(), {
      
    });
    
  }
  

}




