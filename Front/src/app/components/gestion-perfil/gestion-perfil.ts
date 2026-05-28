import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-gestion-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-perfil.html',
  styleUrl: './gestion-perfil.css'
})
export class GestionPerfilComponent implements OnInit {
  private loginService = inject(LoginService);

  // Signals para manejar el estado de manera reactiva y limpia
  usuarios = signal<any[]>([]);
  terminoBusqueda = signal<string>('');

  // Signal computada: Se auto-actualiza cuando cambia 'usuarios' o 'terminoBusqueda'
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
    // Por ahora no hace nada en el back, solo un log indicando la acción del evento
    console.log(`⚠️ Solicitud para eliminar el perfil ID: ${id} (${username}). Acción deshabilitada temporalmente.`);
  }
}