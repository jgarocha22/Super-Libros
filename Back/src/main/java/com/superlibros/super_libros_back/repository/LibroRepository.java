package com.superlibros.super_libros_back.repository;
import org.springframework.stereotype.Repository;
import java.io.File;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import com.superlibros.super_libros_back.model.Libro;
@Repository
public class LibroRepository {
        private final String filePath = "src/main/resources/Libros.json";
        private final ObjectMapper objectMapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        private List<Libro> Listalibros = new ArrayList<>();

        public LibroRepository(){
            cargarLibrosDesdeJSON();
        }

        private void cargarLibrosDesdeJSON() {
            try {
                File file = new File(filePath);
                if (file.exists()) {
                    if (file.length() == 0) {
                        Listalibros = new ArrayList<>();
                        return;
                    }
                    Libro[] librosArray = objectMapper.readValue(file, Libro[].class);
                    Listalibros = new ArrayList<>(Arrays.asList(librosArray));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        private void guardarLibroEnJSON(Libro libro){
            try {
                objectMapper.writeValue(new File(filePath), Listalibros);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        public List<Libro> ObtenerLibros(){
            return Listalibros;
        }

        public void AgregarLibro(Libro libro){
            Listalibros.add(libro);
            guardarLibroEnJSON(libro);
        }

        public Libro BuscarIDJSON(String id){
            for (Libro libro : Listalibros) {
                if (libro.getid().equals(id)) {
                    return libro;
                }
            }
            return null;
        }

        public void ActualizarLibro(){
            try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(filePath), Listalibros);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


}
