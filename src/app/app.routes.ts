import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '403',
        loadComponent: () => import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
        data: { errorCode: '403' },
      },
      {
        path: '404',
        loadComponent: () => import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
        data: { errorCode: '404' },
      },
      {
        path: '500',
        loadComponent: () => import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
        data: { errorCode: '500' },
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
        data: { errorCode: 'maintenance' },
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login-page.component').then((m) => m.LoginPageComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

