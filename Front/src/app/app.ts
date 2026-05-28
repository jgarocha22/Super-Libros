import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Catalogo } from './components/catalogo/catalogo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('super-libros-front');
}
