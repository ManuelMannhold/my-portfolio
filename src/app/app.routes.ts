import { Routes } from '@angular/router';
import { LegalComponent } from './core/features/legal/legal.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./core/features/landing-page/landing-page/landing-page.component').then(m => m.LandingPageComponent) },
    { path: 'legal', component: LegalComponent }
];
