import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenaService } from '../../services/reseña.service'; // Mantén tu ruta de importación intacta

@Component({
  selector: 'app-gestion-reseñas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-resenas.html',
  styleUrl: './gestion-resenas.css'
})

export class GestionResenasComponent implements OnInit {
  private resenaService = inject(ResenaService);

  resenas = signal<any[]>([]); // 👈 'resenas' en lugar de 'reseñas'
  terminoBusqueda = signal<string>('');

  // 👈 Cambiado a resenasFiltradas (sin ñ)
  resenasFiltradas = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.resenas();

    return this.resenas().filter(r => 
      r.idUsuario?.toLowerCase().includes(termino) || 
      r.nombreLibro?.toLowerCase().includes(termino)
    );
  });

  ngOnInit(): void {
    this.cargarResenas();
  }

  cargarResenas(): void {
    this.resenaService.obtenerTodasLasResenas().subscribe({
      next: (data) => {
        // Mapeamos los datos del backend para asegurar que la propiedad de texto no use 'ñ' en el Front
        const datosLimpios = data.map(r => ({
          idLibro: r.idLibro,
          idUsuario: r.idUsuario,
          textoResena: r.Resena, // 👈 Pasamos el 'textoReseña' del back a 'textoResena' para el Front
          calificacion: r.calificacion
        }));
        this.resenas.set(datosLimpios);
      },
      error: (err) => {
        console.error('❌ Error al cargar reseñas en el sistema:', err);
      }
    });
  }

  // 👈 Cambiado a eliminarResena (sin ñ)
  eliminarResena(idLibro: string, idUsuario: string): void {
    console.log(`🗑️ Quitando reseña del usuario [${idUsuario}] en el libro ID: [${idLibro}].`);
  }
}