import { Component, inject, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { CompradorService } from '../../services/comprador.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})

export class PerfilComponent implements OnInit {
  public loginService = inject(LoginService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);
  private compradorService = inject(CompradorService);
  public usuarioActual = this.loginService.currentUser();
  public confirmacionAbierta = signal<boolean>(false);
  public palabraClave = signal<string>('');

  public librosComprados = signal<any[]>([]);

  constructor() {
    // Protección de ruta manual
    if (!this.loginService.currentUser()) {
      this.router.navigate(['/login']);
    }
  }

  abrirConfirmacion(): void {
    this.confirmacionAbierta.set(true);
  }

  cancelarEliminacion(): void {
    this.confirmacionAbierta.set(false);
    this.palabraClave.set('');
  }

  onTextoConfirmacionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.palabraClave.set(input.value);
  }

  // Se ejecuta al cargar el componente y trae la data real del Back
  ngOnInit(): void {
    
    if (this.usuarioActual && this.usuarioActual.username) {
      this.http.get<any[]>(`http://localhost:8080/api/compradores/${this.usuarioActual.username}/compras`)
        .subscribe({
          next: (comprasRealizadas) => {
            this.librosComprados.set(comprasRealizadas); // Guardamos la respuesta en el signal
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('❌ Error cargando el historial de compras desde el servidor:', err);
          }
        });
    }
  }

  get inicialUsuario(): string {
    const user = this.loginService.currentUser();
    return user && user.username ? user.username.charAt(0).toUpperCase() : '?';
  }

  eliminarPerfil(id: number): void {
    if (this.palabraClave() === 'CONFIRMAR') {
      this.compradorService.eliminarComprador(id).subscribe({
        next: (mensajeBack) => {
          console.log('Backend dice:', mensajeBack);
          alert("¡Tu cuenta ha sido eliminada con éxito de SuperLibros!");
          this.loginService.setCurrentUser(null);
          this.cancelarEliminacion();
          this.router.navigate(['/catalogo']);
        },
        error: (err) => {
          console.error('Error al intentar eliminar el comprador', err);
          alert("Hubo un problema de red al intentar eliminar tu cuenta. Inténtalo de nuevo.");
        }
      });
    }
  }
}