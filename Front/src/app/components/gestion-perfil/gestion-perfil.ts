import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CompradorService } from '../../services/comprador.service';

@Component({
  selector: 'app-gestion-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-perfil.html',
  styleUrl: './gestion-perfil.css'
})

export class GestionPerfilComponent implements OnInit {
  private loginService = inject(LoginService);
  private compradorService = inject(CompradorService);

  usuarios = signal<any[]>([]);
  terminoBusqueda = signal<string>('');

  usuariosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) {
      return this.usuarios();
    }
    return this.usuarios().filter(u => 
      u.username?.toLowerCase().includes(termino) || 
      u.email?.toLowerCase().includes(termino)
    );
  });

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loginService.obtenerTodosLosUsuarios().subscribe({
      next: (data) => {
        // Filtramos para que el propio admin no aparezca en la lista de gestión de clientes
        const clientesNormales = data.filter(u => u.rol !== 'ADMIN');
        this.usuarios.set(clientesNormales);
      },
      error: (err) => {
        console.error('❌ Error al mapear los usuarios del sistema:', err);
      }
    });
  }

  eliminarPerfil(id: number, username: string): void {
    if (confirm(`¿Está seguro de que desea eliminar permanentemente el perfil de "${username}"? Esta acción borrará todo su historial y es irreversible.`)) {
      this.compradorService.eliminarComprador(id).subscribe({
        next: (mensajeBack) => {
          console.log('Backend dice:', mensajeBack);
          alert(`El usuario "${username}" ha sido eliminado del sistema con éxito.`);
          this.cargarUsuarios(); 
        },
        error: (err) => {
          console.error('Error al intentar eliminar el comprador desde el panel admin:', err);
          alert('Hubo un problema de red al intentar eliminar la cuenta. Inténtelo de nuevo.');
        }
      });
    }
  }
}