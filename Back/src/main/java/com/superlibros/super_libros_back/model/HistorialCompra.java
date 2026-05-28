package com.superlibros.super_libros_back.model;

public class HistorialCompra {
    private String idLibro;
    private String fechaCompra;

    public HistorialCompra() {
    }

    public HistorialCompra(String idLibro, String fechaCompra) {
        this.idLibro = idLibro;
        this.fechaCompra = fechaCompra;
    }

    public String getIdLibro() { return idLibro; }
    public void setIdLibro(String idLibro) { this.idLibro = idLibro; }

    public String getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(String fechaCompra) { this.fechaCompra = fechaCompra; }
}