import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { LibroService } from '../../services/libro.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Resena } from '../../model/resena.model';
import { ResenaService } from '../../services/resena.service';
@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './detalle-libro.html',
  styleUrls: ['./detalle-libro.css']
})
export class DetalleLibroComponent implements OnInit {
  libro = signal<any | null>(null);
  resenas = signal<Resena[]>([]);
  
  nuevaResena = {
    IDUsuario: 'UsuarioActual', 
    Reseña: '',
    Fecha: new Date().toISOString(), 
    Calificacion: true 
  };

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private resenaService: ResenaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibroById(id).subscribe(data => {
        this.libro.set(data);
      });

      this.resenaService.getResenasPorLibro(id).subscribe(data => this.resenas.set(data));

    }
  }
   

}
