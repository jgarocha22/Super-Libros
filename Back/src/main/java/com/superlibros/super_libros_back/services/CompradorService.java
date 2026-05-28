package com.superlibros.super_libros_back.services;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.repository.CompradorRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class CompradorService {

    private final CompradorRepository repository;

    // Inyección por constructor
    public CompradorService(CompradorRepository repository) {
        this.repository = repository;
    }

    public Comprador registrarComprador(Comprador nuevoComprador) {
        List<Comprador> compradores = repository.findAll();

        boolean emailExiste = compradores.stream()
                .anyMatch(c -> c.getEmail().equalsIgnoreCase(nuevoComprador.getEmail()));
        
        if (emailExiste) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado por otro usuario.");
        }

        // Ciframos la contraseña antes de guardarla
        nuevoComprador.setPassword(hashPassword(nuevoComprador.getPassword()));

        long proximoId = compradores.stream()
                .mapToLong(Comprador::getId)
                .max()
                .orElse(1); // Si está vacío, el máximo ficticio es 1, por ende el primero será 1 + 1 = 2
        
        nuevoComprador.setId(proximoId + 1);

        compradores.add(nuevoComprador);
        repository.saveAll(compradores);
        
        return nuevoComprador;
    }

    public Comprador verificarLogin(String identificador, String password) {
        List<Comprador> compradores = repository.findAll();

        Optional<Comprador> usuarioEncontrado = compradores.stream()
            .filter(c -> c.getEmail().equalsIgnoreCase(identificador) || c.getUsername().equalsIgnoreCase(identificador))
            .findFirst();

        if (usuarioEncontrado.isEmpty()) {
            System.err.println("❌ [ERROR LOGIN] El identificador '" + identificador + "' no está registrado.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario o correo electrónico no existe.");
        }

        Comprador comprador = usuarioEncontrado.get();

        // En el login, aplicamos el hash a la contraseña recibida 
        // y la comparamos con el hash guardado en el JSON
        String hashedInput = hashPassword(password);

        if (!comprador.getPassword().equals(hashedInput)) {
            System.err.println("❌ [ERROR LOGIN] Contraseña incorrecta para: '" + identificador + "'.");
            // Lanza un 401 Unauthorized automático hacia Angular
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta.");
        }

        System.out.println("🎉 [ÉXITO LOGIN] El comprador con credencial '" + identificador + "' ha iniciado sesión correctamente.");
        return comprador;
    }

    /**
     * Método utilitario para convertir una cadena de texto a un hash SHA-256.
     */
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            
            // Convertimos los bytes a representación hexadecimal
            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error crítico: No se pudo encontrar el algoritmo SHA-256", e);
        }
    }
}