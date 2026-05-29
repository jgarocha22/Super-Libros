import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-libro.html',
  styleUrls: ['./detalle-libro.css']
})
export class DetalleLibroComponent implements OnInit {
  libro = signal<any | null>(null);

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibroById(id).subscribe(data => {
        this.libro.set(data);
      });
    }
  }
}