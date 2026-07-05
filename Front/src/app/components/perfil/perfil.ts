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

  public editandoEmail = signal<boolean>(false);
  public editandoDireccion = signal<boolean>(false);
  public editandoPassword = signal<boolean>(false);
  public editandoUsername = signal<boolean>(false);

  public nuevoEmail = signal<string>('');
  public nuevaDireccion = signal<string>('');
  public nuevoPassword = signal<string>('');
  public confirmarPassword = signal<string>('');
  public nuevoUsername = signal<string>('');

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
      this.nuevoEmail.set(this.usuarioActual.email);
      this.nuevaDireccion.set(this.usuarioActual.direccion || '');
      this.nuevoUsername.set(this.usuarioActual.username);

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

  activarEdicionEmail() {
    this.nuevoEmail.set(this.usuarioActual.email);
    this.editandoEmail.set(true);
  }

  activarEdicionDireccion() {
    this.nuevaDireccion.set(this.usuarioActual.direccion || '');
    this.editandoDireccion.set(true);
  }

  activarEdicionUsername() {
    this.nuevoUsername.set(this.usuarioActual.username);
    this.editandoUsername.set(true);
  }

  guardarEmail() {
    if (confirm("¿Seguro que desea modificar su correo electrónico?")) {
      const payload = { ...this.usuarioActual, email: this.nuevoEmail(), password: "" };
      
      this.compradorService.actualizarComprador(this.usuarioActual.id, payload).subscribe({
        next: (usuarioModificado) => {
          this.loginService.setCurrentUser(usuarioModificado);
          this.usuarioActual = usuarioModificado;
          this.editandoEmail.set(false);
          alert("Correo electrónico actualizado con éxito.");
        },
        error: (err) => alert("Error al actualizar correo: " + err.error)
      });
    }
  }

  guardarDireccion() {
    if (confirm("¿Seguro que desea modificar su dirección de registro?")) {
      const payload = { ...this.usuarioActual, direccion: this.nuevaDireccion(), password: "" };
      
      this.compradorService.actualizarComprador(this.usuarioActual.id, payload).subscribe({
        next: (usuarioModificado) => {
          this.loginService.setCurrentUser(usuarioModificado);
          this.usuarioActual = usuarioModificado;
          this.editandoDireccion.set(false);
          alert("Dirección actualizada con éxito.");
        },
        error: (err) => alert("Error al actualizar dirección: " + err.error)
      });
    }
  }

  guardarPassword() {
    if (this.nuevoPassword() !== this.confirmarPassword()) {
      alert("Las contraseñas no coinciden. Inténtelo de nuevo.");
      return;
    }

    if (this.nuevoPassword().trim() === "") {
      alert("La contraseña no puede estar vacía.");
      return;
    }
    
    const payload = { ...this.usuarioActual, password: this.nuevoPassword() };

    this.compradorService.actualizarComprador(this.usuarioActual.id, payload).subscribe({
      next: (usuarioModificado) => {
        this.loginService.setCurrentUser(usuarioModificado);
        this.usuarioActual = usuarioModificado;
        this.editandoPassword.set(false);
        this.nuevoPassword.set('');
        this.confirmarPassword.set('');
        alert("Contraseña modificada con éxito.");
      },
      error: (err) => alert("Error al actualizar la contraseña: " + err.error)
    });
  }

  guardarUsername() {
    if (this.nuevoUsername().trim() === "") {
      alert("❌ El nombre de usuario no puede estar vacío.");
      return;
    }

    if (confirm("¿Seguro que desea modificar su nombre de usuario?")) {
      // Mandamos la estructura con la contraseña vacía tal como pide el servicio[cite: 11]
      const payload = { ...this.usuarioActual, username: this.nuevoUsername(), password: "" };
      
      this.compradorService.actualizarComprador(this.usuarioActual.id, payload).subscribe({
        next: (usuarioModificado) => {
          this.loginService.setCurrentUser(usuarioModificado);
          this.usuarioActual = usuarioModificado;
          this.editandoUsername.set(false);
          alert("Nombre de usuario actualizado con éxito.");
        },
        error: (err) => alert("Error al actualizar el nombre de usuario: " + err.error)
      });
    }
  }

}