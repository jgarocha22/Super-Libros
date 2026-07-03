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
  libroSeleccionado: any = null;

  // Computamos el filtrado reactivo por Nombre o Autor
  librosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.libros();
    
    return this.libros().filter(libro => 
      libro.nombre?.toLowerCase().includes(termino) || 
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
        console.error('Error al obtener los libros del catálogo:', err);
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

  editarLibro(id: string): void {
  const libro = this.libros().find((l: any) => l.id === id);
  if (libro) {
    this.libroSeleccionado = { ...libro }; // Copia del libro para no editar el original por error
    this.mostrarRegistrar = true; // Abrimos el modal
    }
  }

  eliminarLibro(id: string): void {
  // Una pequeña confirmación nativa nunca viene mal para evitar borrados accidentales
  if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
    this.libroService.eliminarLibro(id).subscribe({
      next: () => {
        console.log(` Libro con ID ${id} eliminado correctamente.`);
        this.cargarLibros(); // Vuelve a consultar el JSON y actualiza el Signal de inmediato
      },
      error: (err) => {
        console.error('Error al intentar eliminar el libro:', err);
      }
    });
  }
}

}