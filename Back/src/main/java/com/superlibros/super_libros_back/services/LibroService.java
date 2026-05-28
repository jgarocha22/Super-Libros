package com.superlibros.super_libros_back.services;
import java.util.List;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.repository.LibroRepository;
@Service
public class LibroService {

    private final LibroRepository librosRepository;

    public LibroService(LibroRepository librosRepository) {
        this.librosRepository = librosRepository;
    }
    
    public List<Libro> ObtenerLibros(){
        return librosRepository.ObtenerLibros();
    }

    public Libro registrarLibro(Libro libro) {
        if (libro == null) {
            throw new IllegalArgumentException("El objeto libro no puede ser nulo");
        }

        List<Libro> existentes = librosRepository.ObtenerLibros();
        String nombreNuevo = libro.getnombre().trim();

        for (Libro l : existentes) {
            if (l.getnombre() != null && l.getnombre().trim().equalsIgnoreCase(nombreNuevo)) {
                throw new IllegalArgumentException("Ya existe un libro registrado con el nombre: " + nombreNuevo);
        }
        }

        //generar id aleatorio para el nuevo libro
        String id = UUID.randomUUID().toString();
        libro.setid(id);

        libro.setnombre(nombreNuevo); 

        librosRepository.AgregarLibro(libro);
    
        return libro; 
    }

    public Libro BuscarLibroPorID(String id){
        if (id == null || id.trim().isEmpty()) {
            return null;
        }
        return librosRepository.BuscarIDJSON(id);
    }

}
