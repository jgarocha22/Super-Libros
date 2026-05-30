import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { LoginService } from '../../services/login.service';
import { ResenaService } from '../../services/reseña.service';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './detalle-libro.html',
  styleUrls: ['./detalle-libro.css']
})
export class DetalleLibroComponent implements OnInit {
  libro = signal<any | null>(null);
  mensajeResena: string | null = null;
  errorResena: string | null = null;
  mensajeCarrito: string | null = null;
  errorCarrito: string | null = null;
  libroComprado = signal<boolean>(false);

  nuevaResena = {
    resena: '',
    calificacion: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService,
    public loginService: LoginService,
    private resenaService: ResenaService,
    private carritoService: CarritoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibroById(id).subscribe(data => {
        this.libro.set(data);
      });
      this.verificarLibroComprado(id);
    }
  }

  agregarAlCarrito(): void {
    this.mensajeCarrito = null;
    this.errorCarrito = null;

    const usuarioActual = this.loginService.currentUser();
    if (!usuarioActual || usuarioActual.rol !== 'COMPRADOR') {
      this.router.navigate(['/login']);
      return;
    }

    const libroActual = this.libro();
    if (!libroActual) return;

    // Confirmar antes de agregar al carrito
    const confirmar = window.confirm('¿Seguro que desea agregar el libro al carrito?');
    if (!confirmar) return;

    this.carritoService.agregarItem(usuarioActual.username, libroActual.id, 1).subscribe({
      next: () => {
        this.mensajeCarrito = 'Libro añadido al carrito con éxito.';
        // ocultar mensaje automáticamente
        setTimeout(() => { this.mensajeCarrito = null; }, 4000);
      },
      error: () => {
        this.errorCarrito = 'No se pudo añadir el libro al carrito.';
        setTimeout(() => { this.errorCarrito = null; }, 4000);
      }
    });
  }

  agregarResena(): void {
    this.mensajeResena = null;
    this.errorResena = null;

    const usuarioActual = this.loginService.currentUser();
    if (!usuarioActual || usuarioActual.rol !== 'COMPRADOR') {
      this.router.navigate(['/login']);
      return;
    }

    const libroActual = this.libro();
    const texto = this.nuevaResena.resena.trim();
    if (!libroActual || !texto) {
      this.errorResena = 'Escribe una reseña antes de publicarla.';
      return;
    }
    if (!this.libroComprado()) {
      this.errorResena = 'Solo puedes reseñar libros que ya compraste.';
      return;
    }
    const yaTieneResena = (libroActual.resenas || []).some((resena: any) =>
      resena.idusuario?.toLowerCase() === usuarioActual.username?.toLowerCase()
    );
    if (yaTieneResena) {
      this.errorResena = 'Ya publicaste una reseña para este libro.';
      return;
    }

    this.resenaService.agregarResena(libroActual.id, {
      idusuario: usuarioActual.username,
      resena: texto,
      calificacion: this.nuevaResena.calificacion
    }).subscribe({
      next: (guardado) => {
        if (!guardado) {
          this.errorResena = 'No se pudo guardar la reseña. Solo puedes publicar una reseña por libro.';
          return;
        }

        this.nuevaResena = { resena: '', calificacion: true };
        this.mensajeResena = 'Reseña publicada correctamente.';
        this.libroService.getLibroById(libroActual.id).subscribe(data => {
          this.libro.set(data);
        });
      },
      error: () => {
        this.errorResena = 'Ocurrió un error al publicar la reseña.';
      }
    });
  }

  private verificarLibroComprado(idLibro: string): void {
    const usuarioActual = this.loginService.currentUser();
    if (!usuarioActual || usuarioActual.rol !== 'COMPRADOR') {
      this.libroComprado.set(false);
      return;
    }

    this.http.get<any[]>(`http://localhost:8080/api/compradores/${usuarioActual.username}/compras`).subscribe({
      next: (compras) => {
        this.libroComprado.set((compras || []).some(compra => compra.idLibro === idLibro));
      },
      error: () => {
        this.libroComprado.set(false);
      }
    });
  }
}
