import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { RegistrarLibro } from '../registrar-libro/registrar-libro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, RegistrarLibro, RouterLink],
  templateUrl: './gestion-libros.html',
  styleUrl: './gestion-libros.css'
})
export class GestionLibrosComponent implements OnInit {
  private libroService = inject(LibroService);
  mostrarRegistrar: boolean = false;
  // Estados Reactivos con Signals
  libros = signal<any[]>([]);
  terminoBusqueda = signal<string>('');

  // Computamos el filtrado reactivo por Nombre o Autor
  librosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.libros();
    
    return this.libros().filter(libro => 
      libro.nom?.toLowerCase().includes(termino) || 
      libro.autor?.toLowerCase().includes(termino)
    );
  });

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.obtenerLibros().subscribe({
      next: (data) => {
        this.libros.set(data);
      },
      error: (err) => {
        console.error('❌ Error al obtener los libros del catálogo:', err);
      }
    });
  }

  abrirFormularioAgregar(): void {
    console.log('✨ Abriendo formulario de registro...');
    this.mostrarRegistrar = true;
  }

  
  cerrarModal(): void {
    this.mostrarRegistrar = false;
  }

  // Botones deshabilitados por ahora
  editarLibro(id: string): void {
    console.log(`📝 Intento de editar libro con ID: ${id}. Acción deshabilitada.`);
  }

  eliminarLibro(id: string): void {
    console.log(`🗑️ Intento de eliminar libro con ID: ${id}. Acción deshabilitada.`);
  }
}