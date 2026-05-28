import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../services/libro';

@Component({
  selector: 'app-registrar-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-libro.html',
  styleUrl: './registrar-libro.css',
})
export class RegistrarLibro {
  libroForm: FormGroup;
  mensajeError: string | null = null;

  @Output() cerrar = new EventEmitter<void>();
  @Output() libroGuardado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    this.libroForm = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      sinopsis: ['', Validators.required],
      imagenUrl: ['', Validators.required],
      precio: [1, [Validators.required, Validators.min(1)]],
      tags: ['']
    });
  }

  onSubmit(): void {
    if (this.libroForm.valid) {
      const formValue = { ...this.libroForm.value };
      // Transformación de tags a formato array
      formValue.tags = formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : [];

      this.libroService.crearLibro(formValue).subscribe({
        next: () => {
          this.libroGuardado.emit(); // Notifica al componente de gestión que debe actualizar la tabla
          this.cerrar.emit();
        },
        error: (err) => {
          this.mensajeError = err.error || 'Error al guardar el libro.';
        }
      });
    }
  }


}