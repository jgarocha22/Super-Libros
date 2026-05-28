package com.superlibros.super_libros_back.model;

import java.util.ArrayList;
import java.util.List;

public class Comprador {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String direccion;
    private String fotoPerfil;
    private String rol; // "COMPRADOR" o "ADMIN"
    
    // Listas requeridas por el negocio
    private List<Object> carrito = new ArrayList<>();
    // 👈 Cambiamos Object por HistorialCompra para guardar la estructura normalizada
    private List<HistorialCompra> librosComprados = new ArrayList<>();

    // Constructores
    public Comprador() {}

    public Comprador(Long id, String username, String password, String email, String direccion, String fotoPerfil, String rol) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.direccion = direccion;
        this.fotoPerfil = fotoPerfil;
        this.rol = rol;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public List<Object> getCarrito() { return carrito; }
    public void setCarrito(List<Object> carrito) { this.carrito = carrito; }

    // 👈 Getters y Setters actualizados con el nuevo tipo
    public List<HistorialCompra> getLibrosComprados() { return librosComprados; }
    public void setLibrosComprados(List<HistorialCompra> librosComprados) { this.librosComprados = librosComprados; }
}