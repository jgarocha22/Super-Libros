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

    public boolean RegistrarLibro(Libro libro){
        if (libro == null) {
            return false;
        }

        if (libro.getnombre() == null || libro.getnombre().trim().isEmpty()) {
            return false;
        }
        if (libro.geteditorial() == null || libro.geteditorial().trim().isEmpty()) {
            return false;
        }
        if (libro.getsinopsis() == null || libro.getsinopsis().trim().isEmpty()) {
            return false;
        }
        if (libro.getautor() == null || libro.getautor().trim().isEmpty()) {
            return false;
        }
        if (libro.getimagenUrl() == null || libro.getimagenUrl().trim().isEmpty()) {
            return false;
        }
        if (libro.gettags() == null || libro.gettags().isEmpty()) {
            return false;
        }

        // Validar precio 
        if (libro.getprecio() < 1) {
            return false;
        }

        //validar repetido
        List<Libro> existentes = librosRepository.ObtenerLibros();
        String nombreNuevo = libro.getnombre().trim();
        for (Libro l : existentes) {
            if (l.getnombre() != null && l.getnombre().trim().equalsIgnoreCase(nombreNuevo)) {
                return false;
            }
        }
        // Generar ID aleatorio único
        String id = UUID.randomUUID().toString();
        libro.setid(id); 

        librosRepository.AgregarLibro(libro);
        return true;
    }

    public Libro BuscarLibroPorID(String id){
        if (id == null || id.trim().isEmpty()) {
            return null;
        }
        return librosRepository.BuscarIDJSON(id);
    }

}
