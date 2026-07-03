import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Libro } from "../model/libro.model";

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private apiUrl = 'http://localhost:8080/api/libros';

    constructor(private http: HttpClient) {}

    obtenerLibros(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
    
    crearLibro(libro: Libro): Observable<any> {
    return this.http.post(this.apiUrl, libro, { responseType: 'text' });
    }
    getLibroById(id: string): Observable<Libro> {
        return this.http.get<Libro>(`${this.apiUrl}/${id}`);
    }
    eliminarLibro(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    actualizarLibro(id: string, libro: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
    }
}