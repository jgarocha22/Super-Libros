package com.superlibros.super_libros_back.controller;
import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.services.ReseñaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/reseñas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReseñaController {

    private final ReseñaService reseñaService;

    public ReseñaController(ReseñaService reseñaService) {
        this.reseñaService = reseñaService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Resena>> listarReseñasAdmin() {
        List<Resena> lista = reseñaService.obtenerTodasLasReseñasParaAdmin();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/libro/{idLibro}")
    public ResponseEntity<List<Resena>> obtenerResenasPorLibro(@PathVariable String idLibro) {
        List<Resena> resenas = reseñaService.obtenerReseñasLibro(idLibro);
        return ResponseEntity.ok(resenas);
    }

    @PostMapping("/{idLibro}")
    public ResponseEntity<Boolean> agregarResena(@PathVariable String idLibro, @RequestBody Resena reseña) {
        boolean guardado = reseñaService.agregarResena(idLibro, reseña);
        return ResponseEntity.ok(guardado);
    }

}