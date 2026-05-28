import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../model/libro.model';
import { TarjetaLibro } from '../tarjeta-libro/tarjeta-libro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  imports: [TarjetaLibro, CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit{
  libros: Libro[] = [];

  constructor(private libroService: LibroService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.libroService.obtenerLibros().subscribe({
      next: (data) => { 
        console.log("¡Revisando qué llega de Java!", data);
        this.libros = data; this.cdr.detectChanges();},
      error: (err) => console.error('Error fetching catalog data:', err)
    });
  }
}
