export interface Resena {
  idLibro: string;
  idUsuario: string;
  resena: string;
  calificacion: boolean; // true para recomandado, false para no recomendado
}