package com.superlibros.super_libros_back.model;
import java.time.LocalDateTime;

public class Reseña {
    private String IDUsuario;
    private String Reseña;
    private LocalDateTime Fecha;
    private boolean Calificacion;

    public Reseña() {
    }

    public Reseña(String idUsuario, String reseña, LocalDateTime fecha, boolean calificacion) {
        this.IDUsuario = idUsuario;
        this.Reseña = reseña;
        this.Fecha = fecha;
        this.Calificacion = calificacion;
    }

    public String getIDUsuario() {return IDUsuario;}
    public void setIDUsuario(String idUsuario) {this.IDUsuario = idUsuario;}

    public String getReseña() {return Reseña;}
    public void setReseña(String reseña) {this.Reseña = reseña;}

    public LocalDateTime getFecha() {return Fecha;}
    public void setFecha(LocalDateTime fecha) {this.Fecha = fecha;}

    public boolean isCalificacion() {return Calificacion;}
    public void setCalificacion(boolean calificacion) {this.Calificacion = calificacion;}

}
