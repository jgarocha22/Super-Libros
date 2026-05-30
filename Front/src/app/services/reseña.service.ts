import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../model/resena.model';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/reseñas';

  obtenerTodasLasResenas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin`);
  }

  getResenasByLibro(idLibro: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/libro/${idLibro}`);
  }

  agregarResena(idLibro: string, resena: Resena): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${idLibro}`, resena);
  }
}
