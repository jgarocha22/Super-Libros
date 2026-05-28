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
}