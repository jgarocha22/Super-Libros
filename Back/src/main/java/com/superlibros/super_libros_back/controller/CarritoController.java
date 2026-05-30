package com.superlibros.super_libros_back.controller;

import com.superlibros.super_libros_back.model.CarritoItem;
import com.superlibros.super_libros_back.model.CarritoItemDTO;
import com.superlibros.super_libros_back.services.CarritoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:4200")
public class CarritoController {
    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<CarritoItemDTO>> obtenerCarrito(@PathVariable String username) {
        return new ResponseEntity<>(carritoService.obtenerCarrito(username), HttpStatus.OK);
    }

    @PostMapping("/{username}")
    public ResponseEntity<List<CarritoItemDTO>> agregarItem(
            @PathVariable String username,
            @RequestBody CarritoItem request
    ) {
        String idLibro = request != null ? request.getIdLibro() : null;
        int cantidad = request != null ? request.getCantidad() : 1;
        return new ResponseEntity<>(
            carritoService.agregarItem(username, idLibro, cantidad),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{username}/{idLibro}")
    public ResponseEntity<List<CarritoItemDTO>> eliminarItem(
            @PathVariable String username,
            @PathVariable String idLibro
    ) {
        return new ResponseEntity<>(carritoService.eliminarItem(username, idLibro), HttpStatus.OK);
    }
}
