package com.superlibros.super_libros_back.model;

public class ReseñaAdminDTO {
    private String idLibro;
    private String nombreLibro;
    private String idUsuario;
    private String textoReseña;
    private boolean calificacion;

    public ReseñaAdminDTO(String idLibro, String nombreLibro, String idUsuario, String textoReseña, boolean calificacion) {
        this.idLibro = idLibro;
        this.nombreLibro = nombreLibro;
        this.idUsuario = idUsuario;
        this.textoReseña = textoReseña;
        this.calificacion = calificacion;
    }

    // Getters y Setters estándar para Jackson
    public String getIdLibro() { return idLibro; }
    public void setIdLibro(String idLibro) { this.idLibro = idLibro; }

    public String getNombreLibro() { return nombreLibro; }
    public void setNombreLibro(String nombreLibro) { this.nombreLibro = nombreLibro; }

    public String getIdUsuario() { return idUsuario; }
    public void setIdUsuario(String idUsuario) { this.idUsuario = idUsuario; }

    public String getTextoReseña() { return textoReseña; }
    public void setTextoReseña(String textoReseña) { this.textoReseña = textoReseña; }

    public boolean isCalificacion() { return calificacion; }
    public void setCalificacion(boolean calificacion) { this.calificacion = calificacion; }
}