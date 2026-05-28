import { Component, inject, signal, ChangeDetectorRef, OnInit } from '@angular/core'; // 👈 Importamos OnInit
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 👈 Importamos HttpClient

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit { // 👈 Implementamos OnInit
  public loginService = inject(LoginService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient); // 👈 Inyectamos el cliente HTTP

  // 👈 Inicializamos el signal vacío (ya no está hardcodeado)
  public librosComprados = signal<any[]>([]);

  constructor() {
    // Protección de ruta manual
    if (!this.loginService.currentUser()) {
      this.router.navigate(['/login']);
    }
  }

  // 🚀 NUEVO: Se ejecuta al cargar el componente y trae la data real del Back
  ngOnInit(): void {
    const usuarioActual = this.loginService.currentUser();
    
    if (usuarioActual && usuarioActual.username) {
      this.http.get<any[]>(`http://localhost:8080/api/compradores/${usuarioActual.username}/compras`)
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

  onFotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const usuarioActual = this.loginService.currentUser();
        
        if (usuarioActual) {
          const usuarioActualizado = { ...usuarioActual, fotoPerfil: base64String };
          this.loginService.setCurrentUser(usuarioActualizado);
          this.cdr.detectChanges();
          console.log('📷 Nueva foto de perfil cargada localmente en Base64');
        }
      };
      reader.readAsDataURL(file);
    }
  }
}