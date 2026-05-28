export interface Libro {
    id: string;
    nom: string;
    sinop: string;
    autor: string;
    imagen: string;
    tags: string[];
    stock: number;
    precio: number;
}