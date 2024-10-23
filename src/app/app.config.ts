import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient provider
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
     FormsModule,
     HttpClientModule
  ]
};


