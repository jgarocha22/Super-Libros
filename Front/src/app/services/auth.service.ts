import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuario') || 'null'));
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {}

  establecerUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
  }

  obtenerUsuarioActual() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }
}