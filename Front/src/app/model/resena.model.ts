export interface Resena {
  idlibro?: string;
  idusuario: string; 
  resena: string;    
  fecha?: string;    
  calificacion: boolean; // true = Recomendado, false = No recomendado
}
