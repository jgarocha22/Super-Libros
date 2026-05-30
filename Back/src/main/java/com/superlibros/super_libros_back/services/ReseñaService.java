package com.superlibros.super_libros_back.services;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.repository.LibroRepository;
@Service
public class ReseñaService {
    private final LibroRepository librorepository;

    public ReseñaService(LibroRepository librorepository) {
        this.librorepository = librorepository;
    }

    public boolean agregarResena(String idLibro, Resena resena) {
        if (idLibro == null || resena == null) return false;
    
        Libro libro = librorepository.BuscarIDJSON(idLibro);
        if (libro == null) return false;

        if (resena.getidusuario() == null || resena.getresena() == null) {
            return false;
        }
        resena.setFecha(LocalDateTime.now());
    
        resena.setIdLibro(idLibro); 


        if (libro.getresenas() == null) {
            libro.setResenas(new ArrayList<>());
        }
    
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

    public List<Resena> obtenerTodasLasReseñasParaAdmin() {
    List<Libro> todosLosLibros = librorepository.ObtenerLibros();
    List<Resena> listaAplanada = new ArrayList<>();

    for (Libro libro : todosLosLibros) {
        if (libro.getresenas() != null) {
            for (Resena res : libro.getresenas()) {
                listaAplanada.add(new Resena(
                    libro.getid(),       // Usamos tu getter getnombre() del modelo Libro      // Usamos tu getter getnom() del modelo Libro
                    res.getidusuario(), // Usamos tu getter getIDUsuario() del modelo Reseña
                    res.getresena(),    // Usamos tu getter getReseña() del modelo Reseña
                    res.getfecha(),     // Usamos tu getter getFecha() del modelo Reseña
                    res.getcalificacion() // Usamos tu getter getCalificacion()
                ));
            }
        }
    }
    return listaAplanada;
    }
}
