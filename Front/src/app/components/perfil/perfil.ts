import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {
  public loginService = inject(LoginService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Lista simulada de libros comprados (Historial de libros)
  public librosComprados = signal([
    {
      titulo: 'El Gran Gatsby',
      autor: 'F. Scott Fitzgerald',
      imagen: 'assets/images/gatsby.jpg', // Cambia por rutas reales de tus imágenes
      fechaCompra: '12/04/2026'
    },
    {
      titulo: 'Sobre Cavas y Refrigeración',
      autor: 'Autor Técnico',
      imagen: 'assets/images/cavas.jpg',
      fechaCompra: '02/05/2026'
    },
    {
      titulo: 'Titanic, El Videojuego: El Libro',
      autor: 'James Cameron',
      imagen: 'assets/images/titanic.jpg',
      fechaCompra: '20/05/2026'
    }
  ]);

  constructor() {
    // Protección de ruta manual por si acaso: si no está logueado, al login
    if (!this.loginService.currentUser()) {
      this.router.navigate(['/login']);
    }
  }

  get inicialUsuario(): string {
    const user = this.loginService.currentUser();
    return user && user.username ? user.username.charAt(0).toUpperCase() : '?';
  }

  // Método para capturar la nueva foto de perfil, convertirla a Base64 y actualizar la app
  onFotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        
        // Obtenemos el usuario actual del signal
        const usuarioActual = this.loginService.currentUser();
        
        if (usuarioActual) {
          // Modificamos solo la foto de perfil en el objeto local
          const usuarioActualizado = { ...usuarioActual, fotoPerfil: base64String };
          
          // Actualizamos el Signal global y el localStorage a través de tu servicio
          this.loginService.setCurrentUser(usuarioActualizado);
          
          this.cdr.detectChanges();
          console.log('📷 Nueva foto de perfil cargada localmente en Base64');
          
          // NOTA PARA SPRINT 2: Aquí va el service.updateFoto(base64String).subscribe(...) hacia el Back
          // Para modificar la foto de perfil
        }
      };
      reader.readAsDataURL(file);
    }
  }
}