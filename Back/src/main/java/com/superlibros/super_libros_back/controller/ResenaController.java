package com.superlibros.super_libros_back.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.services.ResenaService;

@RestController
@RequestMapping("/api/resenas")
@CrossOrigin(origins = "http://localhost:4200")
public class ResenaController {

    @Autowired
    private ResenaService resenaService;

    // Guardar una nueva reseña
    @PostMapping
    public ResponseEntity<?> agregarResena(@RequestBody Resena resena) {
    try {
        Resena creada = resenaService.crearResena(resena);
        return ResponseEntity.ok(creada); 
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    } catch (IOException e) {
        return ResponseEntity.internalServerError().body("Error al guardar en el sistema");
    }
}

    // Obtener reseñas de un libro específico
    @GetMapping("/{idLibro}")
    public List<Resena> obtenerResenas(@PathVariable String idLibro) throws IOException {
        return resenaService.obtenerResenasPorLibro(idLibro);
    }
    
}
