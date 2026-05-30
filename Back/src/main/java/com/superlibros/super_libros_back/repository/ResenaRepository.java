package com.superlibros.super_libros_back.repository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.superlibros.super_libros_back.model.Resena;
import org.springframework.stereotype.Repository;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ResenaRepository {
    private final String FILE_PATH = "src/main/resources/resenas.json";
    private final ObjectMapper objectMapper;

    public ResenaRepository() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public List<Resena> buscartodaResena() throws IOException {
        File file = new File(FILE_PATH);
        if (!file.exists()) return new ArrayList<>();
        return objectMapper.readValue(file, new TypeReference<List<Resena>>() {});
    }

    public void guardarResena(Resena resena) throws IOException {
        List<Resena> resenas = buscartodaResena();
        resenas.add(resena);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), resenas);
    }
   
}
