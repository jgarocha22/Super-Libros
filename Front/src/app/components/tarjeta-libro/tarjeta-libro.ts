import { Component, Input } from '@angular/core';
import { Libro } from '../../model/libro.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta-libro',
  imports: [RouterModule],
  templateUrl: './tarjeta-libro.html',
  styleUrl: './tarjeta-libro.css',
})
export class TarjetaLibro {
  @Input() libro!: Libro;
}
