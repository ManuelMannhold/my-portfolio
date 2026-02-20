import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./core/features/landing-page/landing-page/landing-page.component').then(m => m.LandingPageComponent)},
];
