package com.superlibros.super_libros_back.model;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Resena {
    @JsonProperty("idlibro")
    @JsonAlias("idLibro")
    private String idlibro;
    @JsonProperty("idusuario")
    private String idUsuario;
    @JsonProperty("resena")
    private String resena;
    @JsonProperty("fecha")
    private LocalDateTime fecha;
    @JsonProperty("calificacion")
    private boolean calificacion;

    public Resena() {
    }

    public Resena(String idLibro, String idUsuario, String textoReseña, LocalDateTime fecha, boolean calificacion) {
        this.idlibro = idLibro;
        this.idUsuario = idUsuario;
        this.resena = textoReseña;
        this.fecha = fecha;
        this.calificacion = calificacion;
    }

    // Getters y Setters estándar para Jackson
    public String getidlibro() { return idlibro; }
    public void setIdLibro(String idLibro) { this.idlibro = idLibro; }

    public String getidusuario() { return idUsuario; }
    public void setIDUsuario(String idUsuario) { this.idUsuario = idUsuario; }

    public String getresena() { return resena; }
    public void setResena(String resena) { this.resena = resena; }

    public boolean getcalificacion() { return calificacion; }
    public void setCalificacion(boolean calificacion) { this.calificacion = calificacion; }

    public LocalDateTime getfecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}
