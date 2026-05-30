import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../model/resena.model';

@Injectable({ providedIn: 'root' })
export class ResenaService {
  private apiUrl = 'http://localhost:8080/api/resenas'; // Ajusta según tu puerto

  constructor(private http: HttpClient) {}

  // Obtener reseñas de un libro
  getResenasPorLibro(idLibro: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/${idLibro}`);
  }

  // Enviar una nueva reseña
  postResena(resena: Resena): Observable<any> {
    return this.http.post(this.apiUrl, resena);
  }
}