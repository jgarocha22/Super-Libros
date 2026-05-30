package com.superlibros.super_libros_back.model;

public class CarritoItem {
    private String idLibro;
    private int cantidad;

    public CarritoItem() {
    }

    public CarritoItem(String idLibro, int cantidad) {
        this.idLibro = idLibro;
        this.cantidad = cantidad;
    }

    public String getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(String idLibro) {
        this.idLibro = idLibro;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
