import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // <-- Cambia el import
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // <--- Reemplaza provideZoneChangeDetection por este
    provideRouter(routes),
    provideHttpClient()
  ]
};