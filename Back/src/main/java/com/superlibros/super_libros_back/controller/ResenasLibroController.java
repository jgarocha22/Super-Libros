package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.services.ReseñaService;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reseñas")
@CrossOrigin(origins = "http://localhost:4200")
public class ResenasLibroController {

    private final ReseñaService reseñaService;

    public ResenasLibroController(ReseñaService reseñaService) {
        this.reseñaService = reseñaService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Map<String, Object>>> listarReseñasAdmin() {
        return new ResponseEntity<>(reseñaService.obtenerTodasLasReseñasParaAdmin(), HttpStatus.OK);
    }

    @GetMapping("/libro/{idLibro}")
    public ResponseEntity<List<Resena>> obtenerResenasPorLibro(@PathVariable String idLibro) {
        return new ResponseEntity<>(reseñaService.obtenerReseñasLibro(idLibro), HttpStatus.OK);
    }

    @PostMapping("/{idLibro}")
    public ResponseEntity<Boolean> agregarResena(@PathVariable String idLibro, @RequestBody Resena resena) {
        return new ResponseEntity<>(reseñaService.agregarResena(idLibro, resena), HttpStatus.OK);
    }
}
