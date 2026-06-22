import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-registrar-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-libro.html',
  styleUrl: './registrar-libro.css',
})
export class RegistrarLibro {
  @Output() libroGuardadoExitoso = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      sinopsis: ['', Validators.required],
      imagenurl: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      tags: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]],
    });
  }

  mensaje: string = '';
  esError: boolean = false;
  limpiarFormulario() {
    this.form.reset({
      nombre: '',
      autor: '',
      editorial: '',
      sinopsis: '',
      imagenurl: '',
      tags: '',
      precio: 0,
      stock: 0
    });
  }
  enviar() {
  if (this.form.valid) {

    const libroData = { ...this.form.value };

    if (typeof libroData.tags === 'string') {
      libroData.tags = libroData.tags.split(',').map((tag: string) => tag.trim());
    }

    this.libroService.crearLibro(libroData).subscribe({
      next: () => {
        alert("¡Libro registrado correctamente!");
        this.form.reset();
        this.libroGuardadoExitoso.emit();
      },
      error: (err) => {
        alert("Error: " + (err.error || "No se pudo registrar"));
      }
    });
  }
  else{
    this.form.markAllAsTouched();
    alert("Por favor, corrige los errores antes de guardar.");
    return;
  }
  }
}

