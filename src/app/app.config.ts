import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { carReducer } from './store/cars/cars.reducer';
import * as carEffects from './store/cars/cars.effects';
import * as brandEffects from './store/brands/brands.effects';
import { brandReducer } from './store/brands/brands.reducer';
import * as authEffects from './store/auth/auth.effects';
import { AuthReducer } from './store/auth/auth.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState('cars', carReducer),
    provideState('brands', brandReducer),
    provideState('auth', AuthReducer),
    provideEffects(carEffects, brandEffects, authEffects),
  ],
};
