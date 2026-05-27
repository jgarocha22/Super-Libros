package com.superlibros.super_libros_back.controller;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.services.LibroService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/libros")
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

}
