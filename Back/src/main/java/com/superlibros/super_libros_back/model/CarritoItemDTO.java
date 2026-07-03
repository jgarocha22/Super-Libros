package com.superlibros.super_libros_back.model;

public class CarritoItemDTO {
    private String id;
    private String nom;
    private String autor;
    private String imagen;
    private double precio;
    private int cantidad;

    public CarritoItemDTO() {
    }

    public CarritoItemDTO(String id, String nom, String autor, String imagen, double precio, int cantidad) {
        this.id = id;
        this.nom = nom;
        this.autor = autor;
        this.imagen = imagen;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
