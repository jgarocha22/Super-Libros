export interface Libro {
    id: string;
    nombre: string;
    sinopsis: string;
    editorial: string;
    autor: string;
    imagenurl: string;
    tags: string[];
    stock: number;
    precio: number;
}