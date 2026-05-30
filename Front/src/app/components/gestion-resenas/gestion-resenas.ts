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
      r.idUsuario?.toString().toLowerCase().includes(termino) || 
      r.nombreLibro?.toLowerCase().includes(termino)
    );
  });

  ngOnInit(): void {
    this.cargarResenas();
  }

  cargarResenas(): void {
    this.resenaService.obtenerTodasLasResenas().subscribe({
      next: (response) => {
        console.log('📦 [Reseñas] Respuesta del servidor:', response);
        
        const libros = Array.isArray(response) ? response : (response as any).libros || (response as any).content || [];
        const todas: any[] = [];
        
        libros.forEach((libro: any) => {
          // 1. Buscamos la lista de reseñas con todas las variantes posibles (singular, plural, eñe)
          const lista = libro.reseñas || libro.resenas || libro.reseña || libro.resena || libro.reviews || [];
          
          // DEBUG específico para el libro que mencionas
          if (libro.id === 'lib008' || libro.idLibro === 'lib008') {
            console.log('🔍 [Debug lib008] Encontrado:', libro);
            console.log('🔍 [Debug lib008] ¿Tiene lista de reseñas?:', Array.isArray(lista) && lista.length > 0);
          }

          if (Array.isArray(lista)) {
            lista.forEach((res: any) => {
              todas.push({
                idLibro: libro.id || libro.idLibro,
                nombreLibro: libro.nom || libro.nombre || libro.titulo || 'Sin título',
                // Mapeo flexible de los campos internos de la reseña
                idUsuario: res.idUsuario || res.usuario || res.username || res.userId || 'Anónimo',
                textoResena: res.textoReseña || res.textoResena || res.comentario || res.texto || '',
                calificacion: res.calificacion !== undefined ? res.calificacion : (res.puntos || res.estrellas || 0)
              });
            });
          }
        });

        if (todas.length === 0) {
          console.warn('⚠️ Se procesaron los libros pero no se extrajo ninguna reseña. Revisa las keys del JSON.');
        } else {
          console.log(`✅ Total de reseñas encontradas: ${todas.length}`);
        }

        this.resenas.set(todas);
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