import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/compradores/login';

  private baseUsersUrl = 'http://localhost:8080/api/compradores';

  // Mantenemos el uso de Signals (más moderno y eficiente para Angular)
  public currentUser = signal<any>(this.getUserFromStorage());
  
  // Helper para saber si hay alguien logueado sin tener que preguntar al signal
  public isLoggedIn = () => !!this.currentUser();
  public isAdmin = () => this.currentUser()?.rol === 'ADMIN';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  setCurrentUser(user: any) {
    const key = 'usuarioLogueado';
    localStorage.setItem(key, JSON.stringify(user));
    this.currentUser.set(user); 
  }

  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.currentUser.set(null); 
  }

  // Consumir la lista completa de compradores desde el Back para el Admin
  obtenerTodosLosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUsersUrl);
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('usuarioLogueado');
    return user ? JSON.parse(user) : null;
  }
}