package com.superlibros.super_libros_back.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.superlibros.super_libros_back.model.Resena;
import com.superlibros.super_libros_back.repository.ResenaRepository;

@Service
public class ResenaService {

    @Autowired
    private ResenaRepository repository;
    
    public void guardarResena(Resena resena) throws IOException {
        repository.guardarResena(resena);
    }

    public List<Resena> obtenerResenasPorLibro(String idLibro) throws IOException {
        return repository.buscartodaResena().stream()
                .filter(r -> r.getidlibro().equals(idLibro))
                .collect(Collectors.toList());
    }

    public Resena crearResena(Resena resena) throws IOException {
        resena.setFecha(LocalDateTime.now());

        if (resena.getidlibro() == null || resena.getidlibro().isEmpty()) {
            throw new IllegalArgumentException("El ID del libro es obligatorio.");
        }
        
        if (resena.getresena() == null || resena.getresena().isEmpty()) {
            throw new IllegalArgumentException("El contenido de la reseña no puede estar vacío.");
        }


        repository.guardarResena(resena);

        return resena;
    }

}