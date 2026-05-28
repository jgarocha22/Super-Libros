export interface Usuario {
  id?: number;          // El '?' hace que sea opcional, ya que al registrarse el Back le asignará el ID en el JSON
  username: string;     // Nombre de usuario (sin espacios)
  email: string;        // Correo electrónico
  password?: string;    // Contraseña (opcional para que no viaje en consultas públicas de catálogo)
  direccion: string;    // Dirección de habitación/envío requerida
}