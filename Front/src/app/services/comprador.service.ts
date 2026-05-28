import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  // URL base de tu backend en Spring Boot
  private apiUrl = 'http://localhost:8080/api/compradores';

  constructor(private http: HttpClient) {}

  // Petición POST para Registrarse
  registrar(comprador: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, comprador);
  }

  // Petición POST para Login (Enviamos identifier y password)
  login(credenciales: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}