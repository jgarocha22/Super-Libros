import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  private apiUrl = 'http://localhost:8080/api/compradores';

  constructor(private http: HttpClient) {}

  registrar(comprador: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, comprador);
  }

  login(credenciales: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}