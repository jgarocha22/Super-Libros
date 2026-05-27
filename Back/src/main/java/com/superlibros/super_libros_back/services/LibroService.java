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

        if (libro.getnom() == null || libro.getnom().trim().isEmpty()) {
            return false;
        }
        if (libro.getedit() == null || libro.getedit().trim().isEmpty()) {
            return false;
        }
        if (libro.getsinop() == null || libro.getsinop().trim().isEmpty()) {
            return false;
        }
        if (libro.getautor() == null || libro.getautor().trim().isEmpty()) {
            return false;
        }
        if (libro.getimagen() == null || libro.getimagen().trim().isEmpty()) {
            return false;
        }
        if (libro.gettags() == null || libro.gettags().isEmpty()) {
            return false;
        }

        // Validar precio 
        if (libro.getPrecio() < 1) {
            return false;
        }

        //validar repetido
        List<Libro> existentes = librosRepository.ObtenerLibros();
        String nombreNuevo = libro.getnom().trim();
        for (Libro l : existentes) {
            if (l.getnom() != null && l.getnom().trim().equalsIgnoreCase(nombreNuevo)) {
                return false;
            }
        }
        // Generar ID aleatorio único
        String id = UUID.randomUUID().toString();
        libro.setId(id); 

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
