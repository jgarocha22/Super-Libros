import { Component, Input } from '@angular/core';
import { Libro } from '../../model/libro.model';

@Component({
  selector: 'app-tarjeta-libro',
  imports: [],
  templateUrl: './tarjeta-libro.html',
  styleUrl: './tarjeta-libro.css',
})
export class TarjetaLibro {
  @Input() libro!: Libro;
}
