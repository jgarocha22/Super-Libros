package com.superlibros.super_libros_back.model;

public class LoginRequest {
    private String identifier; // Puede recibir el username o el email del input
    private String password;

    public LoginRequest() {}

    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

// NOTA: esto es para como el Login enviará el nombre de usuario (o correo) 
// y la contraseña agrupados en una sola petición, es una buena práctica crear un pequeño objeto contenedor 
// (FUENTE: yutus y stack overflow)