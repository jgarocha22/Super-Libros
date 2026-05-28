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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<String> AgregarLibro(@RequestBody Libro nuevoLibro) {
        boolean resultado = libroservicio.RegistrarLibro(nuevoLibro);
        if (resultado) {
            return new ResponseEntity<>("Libro agregado correctamente", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Error al agregar el libro" , HttpStatus.BAD_REQUEST);
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
