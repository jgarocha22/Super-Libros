import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { LoginService } from '../../services/login.service';
import { ResenaService } from '../../services/reseña.service';
import { CommonModule, DatePipe } from '@angular/common';
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

  nuevaResena = {
    resena: '',
    calificacion: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService,
    public loginService: LoginService,
    private resenaService: ResenaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroService.getLibroById(id).subscribe(data => {
        this.libro.set(data);
      });
    }
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
}
