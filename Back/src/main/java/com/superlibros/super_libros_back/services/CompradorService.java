package com.superlibros.super_libros_back.services;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.repository.CompradorRepository;

import org.springframework.beans.factory.annotation.Value;
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

    // Inyección de credenciales desde application.properties (Como en tu código de referencia)
    @Value("${admin.identifier}")
    private String adminIdentifier;

    @Value("${admin.password}")
    private String adminPassword;

    // Inyección por constructor
    public CompradorService(CompradorRepository repository) {
        this.repository = repository;
    }

    public Comprador registrarComprador(Comprador nuevoComprador) {
        // VALIDACIÓN: Evitar que se registren usuarios normales con el identificador del admin
        if (adminIdentifier.equalsIgnoreCase(nuevoComprador.getUsername()) 
                || adminIdentifier.equalsIgnoreCase(nuevoComprador.getEmail())) {
            throw new RuntimeException("No se puede registrar un usuario con credenciales reservadas del sistema.");
        }

        List<Comprador> compradores = repository.findAll();

        boolean emailExiste = compradores.stream()
                .anyMatch(c -> c.getEmail().equalsIgnoreCase(nuevoComprador.getEmail()));
        
        if (emailExiste) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado por otro usuario.");
        }

        // Ciframos la contraseña del comprador normal antes de guardarla
        nuevoComprador.setPassword(hashPassword(nuevoComprador.getPassword()));
        
        // Asignamos explícitamente el rol predeterminado
        nuevoComprador.setRol("COMPRADOR");

        long proximoId = compradores.stream()
                .mapToLong(Comprador::getId)
                .max()
                .orElse(1); 
        
        nuevoComprador.setId(proximoId + 1);

        compradores.add(nuevoComprador);
        repository.saveAll(compradores);
        
        return nuevoComprador;
    }

    public Comprador verificarLogin(String identificador, String password) {
        
        // 1. INTERCEPCIÓN DE ADMINISTRADOR
        // Evaluamos si el texto ingresado coincide con el identificador máster (ej: "admin")
        if (adminIdentifier.equalsIgnoreCase(identificador)) {
            // Comparamos la contraseña en texto plano tal como viene en el application.properties
            if (adminPassword.equals(password)) {
                System.out.println("👑 [ÉXITO LOGIN] El Administrador Supremo ha iniciado sesión correctamente.");
                
                Comprador admin = new Comprador();
                admin.setId(0L); // ID 0 reservado para el administrador
                admin.setUsername(adminIdentifier);
                admin.setEmail("admin@superlibros.com");
                admin.setDireccion("Oficina Central SuperLibros");
                //admin.setFotoPerfil("assets/icons/admin-avatar.png");
                admin.setRol("ADMIN"); // <-- Rol clave que leerá Angular
                admin.setPassword(""); // Por seguridad, no mandamos credenciales al Front
                
                return admin;
            } else {
                System.err.println("❌ [ERROR LOGIN] Contraseña incorrecta para el Administrador.");
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña de administrador incorrecta.");
            }
        }

        // 2. LOGICÁ PARA COMPRADORES NORMALES
        List<Comprador> compradores = repository.findAll();

        Optional<Comprador> usuarioEncontrado = compradores.stream()
            .filter(c -> c.getEmail().equalsIgnoreCase(identificador) || c.getUsername().equalsIgnoreCase(identificador))
            .findFirst();

        if (usuarioEncontrado.isEmpty()) {
            System.err.println("❌ [ERROR LOGIN] El identificador '" + identificador + "' no está registrado.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario o correo electrónico no existe.");
        }

        Comprador comprador = usuarioEncontrado.get();

        // Aplicamos el hash SHA-256 a la contraseña recibida para compararla con el JSON
        String hashedInput = hashPassword(password);

        if (!comprador.getPassword().equals(hashedInput)) {
            System.err.println("❌ [ERROR LOGIN] Contraseña incorrecta para: '" + identificador + "'.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta.");
        }

        // Si por alguna razón el usuario viejo del JSON no tiene rol asignado, se lo aseguramos aquí
        if (comprador.getRol() == null || comprador.getRol().isEmpty()) {
            comprador.setRol("COMPRADOR");
        }

        System.out.println("🎉 [ÉXITO LOGIN] El comprador con credencial '" + identificador + "' ha iniciado sesión correctamente.");
        
        // Opcional por seguridad: limpiar la contraseña antes de responder a Angular
        comprador.setPassword(""); 
        
        return comprador;
    }

    /**
     * Método utilitario para convertir una cadena de texto a un hash SHA-256.
     */
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            
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