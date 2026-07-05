package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.LibroCompradoDTO; // 👈 NUEVO IMPORT
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

    // Endpoint de Registro (POST /api/compradores/registrar)
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarComprador(@RequestBody Comprador comprador) {
        try {
            Comprador compradorRegistrado = service.registrarComprador(comprador);
            return new ResponseEntity<>(compradorRegistrado, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint de Login (POST /api/compradores/login)
    @PostMapping("/login")
    public ResponseEntity<?> loginComprador(@RequestBody LoginRequest loginRequest) {
        try {
            Comprador compradorAutenticado = service.verificarLogin(loginRequest.getIdentifier(), loginRequest.getPassword());
            return new ResponseEntity<>(compradorAutenticado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    // Endpoint para el Perfil del Usuario (GET /api/compradores/{username}/compras)
    @GetMapping("/{username}/compras")
    public ResponseEntity<List<LibroCompradoDTO>> obtenerHistorialCompras(@PathVariable String username) {
        List<LibroCompradoDTO> historial = service.obtenerHistorialCompras(username);
        return new ResponseEntity<>(historial, HttpStatus.OK);
    }

    // Endpoint para listar todos los usuarios (GET /api/compradores)
    @GetMapping
    public ResponseEntity<List<Comprador>> obtenerTodosLosCompradores() {
        List<Comprador> lista = service.listarCompradores();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // Endpoint para eliminación física (DELETE /api/compradores/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarComprador(@PathVariable Long id) {
        try {
            boolean eliminado = service.eliminarComprador(id);
            if(eliminado) {
                return new ResponseEntity<>("Comprador eliminado con exito", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        //return new ResponseEntity<>("Acción de eliminación recibida en backend para ID: " + id, HttpStatus.OK);
    }
}