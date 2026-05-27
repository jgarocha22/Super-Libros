package com.superlibros.super_libros_back.model;

import java.util.ArrayList;
import java.util.List;

public class Comprador {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String direccion;
    
    // Listas requeridas por el negocio (se guardarán como arreglos vacíos [] en el JSON)
    private List<Object> carrito = new ArrayList<>();
    private List<Object> librosComprados = new ArrayList<>();

    // Constructores
    public Comprador() {}

    public Comprador(Long id, String username, String email, String password, String direccion) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public List<Object> getCarrito() { return carrito; }
    public void setCarrito(List<Object> carrito) { this.carrito = carrito; }

    public List<Object> getLibrosComprados() { return librosComprados; }
    public void setLibrosComprados(List<Object> librosComprados) { this.librosComprados = librosComprados; }
}