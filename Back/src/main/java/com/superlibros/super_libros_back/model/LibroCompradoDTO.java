package com.superlibros.super_libros_back.model;

public class LibroCompradoDTO {
    private String titulo;
    private String autor;
    private String imagen;
    private String fechaCompra;

    public LibroCompradoDTO(String titulo, String autor, String imagen, String fechaCompra) {
        this.titulo = titulo;
        this.autor = autor;
        this.imagen = imagen;
        this.fechaCompra = fechaCompra;
    }

    // Getters y Setters para que Jackson lo serialice a JSON hacia el Front
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public String getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(String fechaCompra) { this.fechaCompra = fechaCompra; }
}