package com.superlibros.super_libros_back.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.superlibros.super_libros_back.model.Comprador;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CompradorRepository {
    // Ruta óptima en la raíz del Back para evitar borrados al recompilar
    private final String FILE_PATH = "src/main/resources/comprador.json"; // data/json/comprador.json
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Lee todos los compradores del archivo JSON
    public List<Comprador> findAll() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>(); // Si no existe el archivo, devuelve una lista vacía
        }
        try {
            return objectMapper.readValue(file, new TypeReference<List<Comprador>>() {});
        } catch (IOException e) {
            System.err.println("⚠️ Error leyendo el archivo JSON: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    // Sobrescribe el archivo JSON con la lista actualizada
    public void saveAll(List<Comprador> compradores) {
        File file = new File(FILE_PATH);
        File carpeta = file.getParentFile();
        
        if (carpeta != null && !carpeta.exists()) {
            carpeta.mkdirs(); // Crea la carpeta 'data' si no existe
        }
        
        try {
            // Guarda el JSON de forma legible (Pretty Printing)
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, compradores);
        } catch (IOException e) {
            System.err.println("⚠️ Error escribiendo en el archivo JSON: " + e.getMessage());
        }
    }
}