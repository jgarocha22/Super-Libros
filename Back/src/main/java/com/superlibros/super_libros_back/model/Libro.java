package com.superlibros.super_libros_back.model;
import java.util.List;
public class Libro {
    private String ID;
    private String Nombre;
    private String Editorial;
    private String Sinopsis;
    private String Autor;
    private String imagenUrl;
    private List<String> Tags;
    private int Stock;
    private double precio;

    public Libro(){
    }

    public Libro(String id, String nombre, String editorial, String sinopsis, String autor, String imagenurl, List<String> tags, int stock, double precio){
        this.ID = id;
        this.Nombre = nombre;
        this.Editorial = editorial;
        this.Sinopsis = sinopsis;
        this.Autor = autor;
        this.imagenUrl = imagenurl;
        this.Tags = tags;
        this.Stock = stock;
        this.precio = precio;
    }

    public String getId() {return ID;}
    public void setId(String id) {this.ID = id;}

    public String getnom() {return Nombre;}
    public void setnom(String nombre) {this.Nombre = nombre;}

    public String getedit() {return Editorial;}
    public void setedit(String editorial) {this.Editorial = editorial;}

    public String getsinop() {return Sinopsis;}
    public void setsinop(String sinopsis) {this.Sinopsis = sinopsis;}

    public String getautor() {return Autor;}
    public void setautor(String autor) {this.Autor = autor;}

    public String getimagen() {return imagenUrl;}
    public void setimagen(String imagenurl) {this.imagenUrl = imagenurl;}

    public List<String> gettags() {return Tags;}
    public void settags(List<String> tags) {this.Tags = tags;}

    public int getstock() {return Stock;}
    public void setstock(int stock) {this.Stock = stock;}

    public double getPrecio() {return precio;}
    public void setPrecio(double precio) {this.precio = precio;}

}