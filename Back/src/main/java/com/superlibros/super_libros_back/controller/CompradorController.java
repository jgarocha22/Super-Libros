package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.LoginRequest;
import com.superlibros.super_libros_back.services.CompradorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compradores")
@CrossOrigin(origins = "http://localhost:4200") // Habilita la comunicación con tu Frontend en Angular
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
            // Retorna un error 400 con la notificación de la regla de negocio rota (correo repetido)
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint de Login (POST por seguridad de credenciales)
    @PostMapping("/login")
    public ResponseEntity<?> loginComprador(@RequestBody LoginRequest loginRequest) {
        try {
            Comprador compradorAutenticado = service.verificarLogin(loginRequest.getIdentifier(), loginRequest.getPassword());
            return new ResponseEntity<>(compradorAutenticado, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Retorna un error 401 si no coinciden los datos
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}