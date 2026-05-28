package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.LoginRequest;
import com.superlibros.super_libros_back.services.CompradorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compradores")
@CrossOrigin(origins = "http://localhost:4200") 
public class CompradorController {

    private final CompradorService service;

    public CompradorController(CompradorService service) {
        this.service = service;
    }

    // Endpoint de Registro (POST)
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarComprador(@RequestBody Comprador comprador) {
        try {
            Comprador compradorRegistrado = service.registrarComprador(comprador);
            return new ResponseEntity<>(compradorRegistrado, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint de Login (POST)
    @PostMapping("/login")
    public ResponseEntity<?> loginComprador(@RequestBody LoginRequest loginRequest) {
        try {
            Comprador compradorAutenticado = service.verificarLogin(loginRequest.getIdentifier(), loginRequest.getPassword());
            return new ResponseEntity<>(compradorAutenticado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    // 🚀 NUEVO: Endpoint para listar todos los usuarios (GET /api/compradores)
    @GetMapping
    public ResponseEntity<List<Comprador>> obtenerTodosLosCompradores() {
        List<Comprador> lista = service.listarCompradores();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // 🚀 OPCIONAL: Placeholder para cuando actives la eliminación física (DELETE /api/compradores/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarComprador(@PathVariable Long id) {
        // De momento no altera el JSON, queda preparado estructuralmente
        return new ResponseEntity<>("Acción de eliminación recibida en backend para ID: " + id, HttpStatus.OK);
    }
}