import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/libros';

  // Obtener la lista completa de libros
  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}