import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarritoDetalle {
  id: string;
  nom: string;
  autor: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

export interface CarritoItemRequest {
  idLibro: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8080/api/carrito';

  constructor(private http: HttpClient) {}

  obtenerCarrito(username: string): Observable<CarritoDetalle[]> {
    return this.http.get<CarritoDetalle[]>(`${this.apiUrl}/${username}`);
  }

  agregarItem(username: string, idLibro: string, cantidad = 1): Observable<CarritoDetalle[]> {
    const payload: CarritoItemRequest = { idLibro, cantidad };
    return this.http.post<CarritoDetalle[]>(`${this.apiUrl}/${username}`, payload);
  }

  eliminarItem(username: string, idLibro: string): Observable<CarritoDetalle[]> {
    return this.http.delete<CarritoDetalle[]>(`${this.apiUrl}/${username}/${idLibro}`);
  }
}
