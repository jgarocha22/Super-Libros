package com.superlibros.super_libros_back.services;

import com.superlibros.super_libros_back.model.Comprador;
import com.superlibros.super_libros_back.model.HistorialCompra; // 👈 Nuevo Import
import com.superlibros.super_libros_back.model.Libro;           // 👈 Nuevo Import
import com.superlibros.super_libros_back.model.LibroCompradoDTO; // 👈 Nuevo Import
import com.superlibros.super_libros_back.repository.CompradorRepository;
import com.superlibros.super_libros_back.repository.LibroRepository; // 👈 Nuevo Import

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList; // 👈 Nuevo Import
import java.util.List;
import java.util.Optional;

@Service
public class CompradorService {

    private final CompradorRepository repository;
    private final LibroRepository libroRepository; // Inyectamos el repositorio de libros

    @Value("${admin.identifier}")
    private String adminIdentifier;

    @Value("${admin.password}")
    private String adminPassword;

    // Actualizamos el constructor para recibir ambos repositorios
    public CompradorService(CompradorRepository repository, LibroRepository libroRepository) {
        this.repository = repository;
        this.libroRepository = libroRepository;
    }

    /**
     * Busca los IDs del historial del comprador y arma el DTO completo para Angular.
     */
    public List<LibroCompradoDTO> obtenerHistorialCompras(String username) {
        List<LibroCompradoDTO> resultadoFront = new ArrayList<>();

        Optional<Comprador> usuarioEncontrado = repository.findAll().stream()
                .filter(c -> c.getUsername().equalsIgnoreCase(username))
                .findFirst();

        if (usuarioEncontrado.isPresent()) {
            Comprador comprador = usuarioEncontrado.get();

            if (comprador.getLibrosComprados() != null) {
                for (HistorialCompra hc : comprador.getLibrosComprados()) {
                    
                    Libro libroDetalle = libroRepository.BuscarIDJSON(hc.getIdLibro());

                    if (libroDetalle != null) {
                        resultadoFront.add(new LibroCompradoDTO(
                            libroDetalle.getid(),
                            libroDetalle.getnombre(),    
                            libroDetalle.getautor(),
                            libroDetalle.getimagenUrl(),
                            hc.getFechaCompra()
                        ));
                    }
                }
            }
        }
        return resultadoFront;
    }

    public Comprador registrarComprador(Comprador nuevoComprador) {
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

        nuevoComprador.setPassword(hashPassword(nuevoComprador.getPassword()));
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
        if (adminIdentifier.equalsIgnoreCase(identificador)) {
            if (adminPassword.equals(password)) {
                System.out.println("👑 [ÉXITO LOGIN] El Administrador Supremo ha iniciado sesión correctamente.");
                
                Comprador admin = new Comprador();
                admin.setId(0L); 
                admin.setUsername(adminIdentifier);
                admin.setEmail("admin@superlibros.com");
                admin.setDireccion("Oficina Central SuperLibros");
                admin.setRol("ADMIN"); 
                admin.setPassword(""); 
                
                return admin;
            } else {
                System.err.println("❌ [ERROR LOGIN] Contraseña incorrecta para el Administrador.");
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña de administrador incorrecta.");
            }
        }

        List<Comprador> compradores = repository.findAll();

        Optional<Comprador> usuarioEncontrado = compradores.stream()
            .filter(c -> c.getEmail().equalsIgnoreCase(identificador) || c.getUsername().equalsIgnoreCase(identificador))
            .findFirst();

        if (usuarioEncontrado.isEmpty()) {
            System.err.println("❌ [ERROR LOGIN] El identificador '" + identificador + "' no está registrado.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario o correo electrónico no existe.");
        }

        Comprador comprador = usuarioEncontrado.get();
        String hashedInput = hashPassword(password);

        if (!comprador.getPassword().equals(hashedInput)) {
            System.err.println("❌ [ERROR LOGIN] Contraseña incorrecta para: '" + identificador + "'.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta.");
        }

        if (comprador.getRol() == null || comprador.getRol().isEmpty()) {
            comprador.setRol("COMPRADOR");
        }

        System.out.println("🎉 [ÉXITO LOGIN] El comprador con credencial '" + identificador + "' ha iniciado sesión correctamente.");
        comprador.setPassword(""); 
        
        return comprador;
    }

    public List<Comprador> listarCompradores() {
        List<Comprador> compradores = repository.findAll();
        compradores.forEach(comprador -> comprador.setPassword(""));
        return compradores;
    }

    public boolean eliminarComprador(long id) {
        return repository.EliminarComprador(id);
    }

    public Comprador actualizarComprador(long id, Comprador datos) {
        List<Comprador> compradores = repository.findAll();
        // 1. Regala de Negocio: Validar que el nuevo email no le pertenezca a OTRO usuario

        if (adminIdentifier.equalsIgnoreCase(datos.getUsername())) {
            throw new RuntimeException("No se puede utilizar el nombre de usuario reservado del administrador.");
        }

        boolean usernameExiste = compradores.stream()
                .anyMatch(c -> c.getUsername().equalsIgnoreCase(datos.getUsername()) && c.getId() != id);
        
        if (usernameExiste) {
            throw new RuntimeException("El nombre de usuario ya se encuentra registrado por otra persona.");
        }

        boolean emailExiste = compradores.stream()
                .anyMatch(c -> c.getEmail().equalsIgnoreCase(datos.getEmail()) && c.getId() != id);
        
        if (emailExiste) {
            throw new RuntimeException("El nuevo correo electrónico ya se encuentra registrado por otro usuario.");
        }

        // 2. Regla de Negocio: Cifrar la contraseña si el usuario introdujo una nueva
        if (datos.getPassword() != null && !datos.getPassword().isEmpty()) {
            datos.setPassword(hashPassword(datos.getPassword()));
        }

        // 3. COMUNICACIÓN CON EL REPOSITORIO: Delegamos la mutación y guardado de datos
        Comprador compradorModificado = repository.actualizarComprador(id, datos);
        
        if (compradorModificado == null) {
            throw new RuntimeException("El usuario con ID " + id + " no existe en el sistema.");
        }

        // Limpieza de seguridad antes de retornar al controlador
        compradorModificado.setPassword("");
        return compradorModificado;
    }

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
