package com.superlibros.super_libros_back.services;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.superlibros.super_libros_back.model.Libro;
import com.superlibros.super_libros_back.model.Reseña;
import com.superlibros.super_libros_back.model.ReseñaAdminDTO;
import com.superlibros.super_libros_back.repository.LibroRepository;
@Service
public class ReseñaService {
    private final LibroRepository librorepository;

    public ReseñaService(LibroRepository librorepository) {
        this.librorepository = librorepository;
    }

    public boolean AgregarReseña(String idLibro, Reseña reseña) {
        if (idLibro == null || idLibro.trim().isEmpty()) {
            return false;
        }
        if (reseña == null) {
            return false;
        }
        if (reseña.getIDUsuario() == null || reseña.getIDUsuario().trim().isEmpty()) {
            return false;
        }
        if (reseña.getReseña() == null || reseña.getReseña().trim().isEmpty()) {
            return false;
        }

        Libro libro = librorepository.BuscarIDJSON(idLibro);
        if (libro == null) {
            return false;
        }

        reseña.setFecha(LocalDateTime.now());

        libro.getreseñas().add(reseña);
        librorepository.ActualizarLibro();
        return true;
    }

    public List<Reseña> ObtenerReseñaLibro(String idLibro){
        Libro libro = librorepository.BuscarIDJSON(idLibro);
        
        if (libro == null || libro.getreseñas() == null) {
            return new ArrayList<>();
        }
        List<Reseña> reseñas = libro.getreseñas();
        reseñas.sort((r1, r2) -> r2.getFecha().compareTo(r1.getFecha()));
        return reseñas;

    }

    public List<ReseñaAdminDTO> ObtenerTodasLasReseñasParaAdmin() {
    List<Libro> todosLosLibros = librorepository.ObtenerLibros();
    List<ReseñaAdminDTO> listaAplanada = new ArrayList<>();

    for (Libro libro : todosLosLibros) {
        if (libro.getreseñas() != null) {
            for (Reseña res : libro.getreseñas()) {
                listaAplanada.add(new ReseñaAdminDTO(
                    libro.getId(),
                    libro.getnom(),       // Usamos tu getter getnom() del modelo Libro
                    res.getIDUsuario(),   // Usamos tu getter getIDUsuario()
                    res.getReseña(),      // Usamos tu getter getReseña()
                    res.isCalificacion()
                ));
            }
        }
    }
    return listaAplanada;
}
}