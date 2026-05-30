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
    // 1. Clonamos el objeto del formulario
    const libroData = { ...this.form.value };

    // 2. Convertimos el string de tags a un array de strings
    if (typeof libroData.tags === 'string') {
      libroData.tags = libroData.tags.split(',').map((tag: string) => tag.trim());
    }

    // 3. Enviamos el objeto con el formato correcto
    this.libroService.crearLibro(libroData).subscribe({
      next: () => {
        alert("¡Libro registrado correctamente!");
        this.form.reset(); // Limpia los campos sin cerrar el modal
        this.libroGuardadoExitoso.emit();
      },
      error: (err) => {
        // Mostramos el mensaje claro que viene del backend
        alert("Error: " + (err.error || "No se pudo registrar"));
      }
    });
  }
  else{
    this.form.markAllAsTouched();
    alert("Por favor, corrige los errores antes de guardar.");
    return; // 3. Detenemos la ejecución aquí
  }
  }
}

