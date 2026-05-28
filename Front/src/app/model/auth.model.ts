export interface AuthRequest {
  identifier: string; // Puede recibir el username o el correo indistintamente
  password: string;   // Contraseña ingresada
}