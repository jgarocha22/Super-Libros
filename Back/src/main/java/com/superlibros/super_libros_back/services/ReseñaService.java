package com.superlibros.super_libros_back.services;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.repository.CompradorRepository;
import com.superlibros.super_libros_back.repository.LibroRepository;
@Service
public class ReseñaService {
    private final LibroRepository librorepository;
    private final CompradorRepository compradorRepository;

    public ReseñaService(LibroRepository librorepository, CompradorRepository compradorRepository) {
        this.librorepository = librorepository;
        this.compradorRepository = compradorRepository;
    }

    public boolean agregarResena(String idLibro, Resena resena) {
        if (idLibro == null || resena == null) return false;
    
        Libro libro = librorepository.BuscarIDJSON(idLibro);
        if (libro == null) return false;

        if (resena.getidusuario() == null || resena.getresena() == null || resena.getresena().trim().isEmpty()) {
            return false;
        }
        resena.setResena(resena.getresena().trim());
        Optional<Comprador> compradorEncontrado = compradorRepository.findAll().stream()
            .filter(c -> c.getUsername().equalsIgnoreCase(resena.getidusuario())
                && "COMPRADOR".equalsIgnoreCase(c.getRol()))
            .findFirst();
        if (compradorEncontrado.isEmpty()) {
            return false;
        }

        Comprador comprador = compradorEncontrado.get();
        boolean libroComprado = comprador.getLibrosComprados() != null
            && comprador.getLibrosComprados().stream()
                .anyMatch(compra -> compra.getIdLibro().equalsIgnoreCase(idLibro));
        if (!libroComprado) {
            return false;
        }

        if (libro.getresenas() == null) {
            libro.setResenas(new ArrayList<>());
        }
        boolean yaTieneResena = libro.getresenas().stream()
            .anyMatch(r -> r.getidusuario() != null
                && r.getidusuario().equalsIgnoreCase(resena.getidusuario()));
        if (yaTieneResena) {
            return false;
        }

        resena.setFecha(LocalDateTime.now());
        resena.setIdLibro(idLibro);
    
        libro.getresenas().add(resena);
    
        librorepository.ActualizarLibro();
        return true;
    }
    public List<Resena> obtenerReseñasLibro(String idLibro) {
        Libro libro = librorepository.BuscarIDJSON(idLibro);
    
        if (libro == null || libro.getresenas() == null) {
            return new ArrayList<>();
        }
        return libro.getresenas().stream()
            .sorted((r1, r2) -> r2.getfecha().compareTo(r1.getfecha())) // Orden descendente (más nuevas primero)
            .collect(Collectors.toList());
    }

    public List<Map<String, Object>> obtenerTodasLasReseñasParaAdmin() {
    List<Libro> todosLosLibros = librorepository.ObtenerLibros();
    List<Map<String, Object>> listaAplanada = new ArrayList<>();

    for (Libro libro : todosLosLibros) {
        if (libro.getresenas() != null) {
            for (Resena res : libro.getresenas()) {
                Map<String, Object> item = new HashMap<>();
                item.put("idLibro", libro.getid());
                item.put("nombreLibro", libro.getnombre());
                item.put("idUsuario", res.getidusuario());
                item.put("textoResena", res.getresena());
                item.put("calificacion", res.getcalificacion());
                item.put("fecha", res.getfecha());
                listaAplanada.add(item);
            }
        }
    }
    return listaAplanada;
    }
}
