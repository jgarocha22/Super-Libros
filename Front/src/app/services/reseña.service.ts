import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/reseñas';

  obtenerTodasLasResenas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin`);
  }
}