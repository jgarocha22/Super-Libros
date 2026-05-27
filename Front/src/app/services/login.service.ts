import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/compradores/login';

  // 2. Creamos el Signal reactivo inicializado con lo que haya en el localStorage
  public currentUser = signal<any>(this.getUserFromStorage());

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // 3. Método para guardar la sesión y avisar de inmediato a toda la app
  setCurrentUser(user: any) {
    localStorage.setItem('usuarioLogueado', JSON.stringify(user));
    this.currentUser.set(user); // Actualiza el signal
  }

  // 4. Método para limpiar la sesión reactivamente
  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.currentUser.set(null); // Al pasar a null, el Navbar cambiará solo
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('usuarioLogueado');
    return user ? JSON.parse(user) : null;
  }
}