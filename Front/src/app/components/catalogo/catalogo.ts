import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../model/libro.model';
import { TarjetaLibro } from '../tarjeta-libro/tarjeta-libro';

@Component({
  selector: 'app-catalogo',
  imports: [TarjetaLibro],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit{
  libros: Libro[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.libroService.obtenerLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error('Error fetching catalog data:', err)
    });
  }
}
