import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Apuntamos al endpoint de login en tu backend de Spring Boot
  private apiUrl = 'http://localhost:8080/api/compradores/login';

  constructor(private http: HttpClient) { }

  // Este método recibe { identifier, password } y lo manda al Back
  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}