package com.superlibros.super_libros_back.model;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Libro {
    @JsonProperty("id")
    private String id;

    @JsonProperty("nombre") // 🚀 Fuerza a buscar "nombre" completo en el JSON
    private String nombre;

    @JsonProperty("editorial")
    private String editorial;

    @JsonProperty("sinopsis")
    private String sinopsis;

    @JsonProperty("autor")
    private String autor;

    @JsonProperty("imagenurl")
    private String imagenurl;

    @JsonProperty("tags")
    private List<String> tags;

    @JsonProperty("stock")
    private int stock;

    @JsonProperty("precio")
    private double precio;

    @JsonProperty("reseñas")
    private List<Reseña> reseñas;

    public Libro(){
    }

    public Libro(String id, String nombre, String editorial, String sinopsis, String autor, String imagenurl, List<String> tags, int stock, double precio, List<Reseña> reseñas) {
        this.id = id;
        this.nombre = nombre;
        this.editorial = editorial;
        this.sinopsis = sinopsis;
        this.autor = autor;
        this.imagenurl = imagenurl;
        this.tags = tags;
        this.stock = stock;
        this.precio = precio;
        this.reseñas = reseñas;
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

    public List<Reseña> getreseñas() {return reseñas;}
    public void setReseñas(List<Reseña> reseñas) {this.reseñas = reseñas;}

}