package com.superlibros.super_libros_back.services;

import com.superlibros.super_libros_back.model.CarritoItem;
import com.superlibros.super_libros_back.model.CarritoItemDTO;
import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.repository.CompradorRepository;
import com.superlibros.super_libros_back.repository.LibroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {
    private final CompradorRepository compradorRepository;
    private final LibroRepository libroRepository;

    public CarritoService(CompradorRepository compradorRepository, LibroRepository libroRepository) {
        this.compradorRepository = compradorRepository;
        this.libroRepository = libroRepository;
    }

    public List<CarritoItemDTO> obtenerCarrito(String username) {
        List<Comprador> compradores = compradorRepository.findAll();
        Comprador comprador = buscarComprador(username, compradores);
        return mapearDetalle(comprador.getCarrito());
    }

    public List<CarritoItemDTO> agregarItem(String username, String idLibro, int cantidad) {
        if (idLibro == null || idLibro.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idLibro es requerido");
        }

        Libro libro = libroRepository.BuscarIDJSON(idLibro);
        if (libro == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado");
        }

        int cantidadSegura = cantidad <= 0 ? 1 : cantidad;

        List<Comprador> compradores = compradorRepository.findAll();
        Comprador comprador = buscarComprador(username, compradores);
        
        if (comprador.getCarrito() == null) {
            comprador.setCarrito(new ArrayList<>());
        }
        
        List<CarritoItem> carrito = comprador.getCarrito();

        Optional<CarritoItem> existente = carrito.stream()
                .filter(item -> item.getIdLibro().equalsIgnoreCase(idLibro))
                .findFirst();

        if (existente.isPresent()) {
            CarritoItem item = existente.get();
            item.setCantidad(item.getCantidad() + cantidadSegura);
        } else {
            carrito.add(new CarritoItem(idLibro, cantidadSegura));
        }

        compradorRepository.saveAll(compradores);
        return mapearDetalle(carrito);
    }

    public List<CarritoItemDTO> eliminarItem(String username, String idLibro) {
        List<Comprador> compradores = compradorRepository.findAll();
        Comprador comprador = buscarComprador(username, compradores);
        List<CarritoItem> carrito = comprador.getCarrito();

        if (carrito != null) {
            carrito.removeIf(item -> item.getIdLibro().equalsIgnoreCase(idLibro));
        }

        compradorRepository.saveAll(compradores);
        return mapearDetalle(carrito);
    }

    private Comprador buscarComprador(String username, List<Comprador> compradores) {
        if (username == null || username.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username es requerido");
        }

        return compradores.stream()
                .filter(c -> c.getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comprador no encontrado"));
    }

    private List<CarritoItemDTO> mapearDetalle(List<CarritoItem> items) {
        List<CarritoItemDTO> detalle = new ArrayList<>();

        if (items == null) {
            return detalle;
        }

        for (CarritoItem item : items) {
            Libro libro = libroRepository.BuscarIDJSON(item.getIdLibro());
            if (libro == null) {
                continue;
            }

            detalle.add(new CarritoItemDTO(
                    libro.getId(),
                    libro.getnom(),
                    libro.getautor(),
                    libro.getimagen(),
                    libro.getPrecio(),
                    item.getCantidad()
            ));
        }

        return detalle;
    }
}
