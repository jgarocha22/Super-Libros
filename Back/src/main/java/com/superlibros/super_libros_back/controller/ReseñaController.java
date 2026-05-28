package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.ReseñaAdminDTO;
import com.superlibros.super_libros_back.services.ReseñaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<List<ReseñaAdminDTO>> listarReseñasAdmin() {
        List<ReseñaAdminDTO> lista = reseñaService.ObtenerTodasLasReseñasParaAdmin();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }
}