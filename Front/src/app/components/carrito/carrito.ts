import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarritoDetalle, CarritoService } from '../../services/carrito.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  items = signal<CarritoDetalle[]>([]);
  cargando = signal<boolean>(true);
  errorMensaje = signal<string | null>(null);
  exitoMensaje = signal<string | null>(null);

  total = computed(() =>
    this.items().reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  );

  ngOnInit(): void {
    const usuario = this.loginService.currentUser();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarCarrito(usuario.username);
  }

  cargarCarrito(username: string): void {
    this.cargando.set(true);
    this.errorMensaje.set(null);

    this.carritoService.obtenerCarrito(username).subscribe({
      next: (data) => {
        this.items.set(data ?? []);
      },
      error: () => {
        this.errorMensaje.set('No se pudo cargar el carrito.');
      },
      complete: () => {
        this.cargando.set(false);
      }
    });
  }

  eliminarItem(item: CarritoDetalle): void {
    const usuario = this.loginService.currentUser();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService.eliminarItem(usuario.username, item.id).subscribe({
      next: (data) => {
        this.items.set(data ?? []);
      },
      error: () => {
        this.errorMensaje.set('No se pudo quitar el item.');
      }
    });
  }

  finalizarCompra(): void {
    const usuario = this.loginService.currentUser();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    // Confirmar antes de finalizar
    const confirmar = window.confirm('¿Seguro que desea continuar con la compra?');
    if (!confirmar) return;

    this.errorMensaje.set(null);
    this.exitoMensaje.set(null);

    this.carritoService.finalizarCompra(usuario.username).subscribe({
      next: (mensaje) => {
        this.items.set([]);
        this.exitoMensaje.set(mensaje || 'Compra realizada con éxito.');
        setTimeout(() => this.exitoMensaje.set(null), 5000);
      },
      error: () => {
        this.errorMensaje.set('No se pudo finalizar la compra.');
        setTimeout(() => this.errorMensaje.set(null), 5000);
      }
    });
  }
}
