package com.superlibros.super_libros_back.controller;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.services.LibroService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {
    private final LibroService libroservicio;

    public LibroController(LibroService libroservicio) {
        this.libroservicio = libroservicio;
    }

    @GetMapping
    public ResponseEntity<List<Libro>> ObtenerlibroCatalogo(){
        List<Libro> catalogo = libroservicio.ObtenerLibros();
        return new ResponseEntity<>(catalogo, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<?> agregarLibro(@Valid @RequestBody Libro nuevoLibro) {
        try {
            Libro libroGuardado = libroservicio.registrarLibro(nuevoLibro);
            return new ResponseEntity<>(libroGuardado, HttpStatus.CREATED);
            
        } catch (IllegalArgumentException e) {
            // Si el libro está duplicado o el objeto es inválido, atrapamos el mensaje explícito (error 404)
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> ObtenerLibroPorId(@PathVariable String id) {
        Libro libro = libroservicio.BuscarLibroPorID(id);
        if (libro != null) {
            return new ResponseEntity<>(libro, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
  

}
