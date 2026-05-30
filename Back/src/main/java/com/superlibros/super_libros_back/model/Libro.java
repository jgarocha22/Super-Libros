package com.superlibros.super_libros_back.model;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
@JsonIgnoreProperties(ignoreUnknown = true)
public class Libro {
    @JsonProperty("id")
    private String id;

    @NotBlank(message = "El nombre es obligatorio")
    @JsonProperty("nombre") 
    private String nombre;

    @NotBlank(message = "La editorial es obligatoria")
    @JsonProperty("editorial")
    private String editorial;

    @NotBlank(message = "La sinopsis es obligatoria")
    @JsonProperty("sinopsis")
    private String sinopsis;

    @NotBlank(message = "El autor es obligatorio")
    @JsonProperty("autor")
    private String autor;

    @NotBlank(message = "La URL de la imagen es obligatoria")
    @JsonProperty("imagenurl")
    private String imagenurl;

    @NotEmpty(message = "Al menos un tag es obligatorio")
    @JsonProperty("tags")
    private List<String> tags;

    @Min(value = 1, message = "El stock debe ser al menos 1")   
    @JsonProperty("stock")
    private int stock;

    @Min(value = 0, message = "El precio debe ser al menos 0 ")
    @JsonProperty("precio")
    private double precio;

    @JsonProperty("reseñas")
    private List<Resena> resenas = new ArrayList<>();

    public Libro(){
    }

    public Libro(String id, String nombre, String editorial, String sinopsis, String autor, String imagenurl, List<String> tags, int stock, double precio, List<Resena> reseñas) {
        this.id = id;
        this.nombre = nombre;
        this.editorial = editorial;
        this.sinopsis = sinopsis;
        this.autor = autor;
        this.imagenurl = imagenurl;
        this.tags = tags;
        this.stock = stock;
        this.precio = precio;
        this.resenas = reseñas;
    }

    public String getid() {return id;}  
    public void setid(String id) {this.id = id;}

    public String getnombre() {return nombre;}
    public void setnombre(String nombre) {this.nombre = nombre;}

    public String geteditorial() {return editorial;}
    public void seteditorial(String editorial) {this.editorial = editorial;}

    public String getsinopsis() {return sinopsis;}
    public void setsinopsis(String sinopsis) {this.sinopsis = sinopsis;}

    public String getautor() {return autor;}
    public void setautor(String autor) {this.autor = autor;}

    public String getimagenUrl() {return imagenurl;}
    public void setimagenUrl(String imagenUrl) {this.imagenurl = imagenUrl;}

    public List<String> gettags() {return tags;}
    public void settags(List<String> tags) {this.tags = tags;}

    public int getstock() {return stock;}
    public void setstock(int stock) {this.stock = stock;}

    public double getprecio() {return precio;}
    public void setprecio(double precio) {this.precio = precio;}

    public List<Resena> getresenas() {return resenas;}
    public void setResenas(List<Resena> resenas) {this.resenas = resenas;}

}