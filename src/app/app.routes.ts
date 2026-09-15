import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/landing/landing-page.component').then((m) => m.LandingPageComponent),
      },
      {
        path: 'courses',
        loadComponent: () => import('./features/public/catalog/catalog-page.component').then((m) => m.CatalogPageComponent),
      },
      {
        path: 'courses/:slug',
        loadComponent: () => import('./features/public/course-detail/course-detail.component').then((m) => m.CourseDetailComponent),
      },
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
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register-page.component').then((m) => m.RegisterPageComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password-page.component').then((m) => m.ForgotPasswordPageComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/reset-password/reset-password-page.component').then((m) => m.ResetPasswordPageComponent),
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./features/auth/verify-email/verify-email-page.component').then((m) => m.VerifyEmailPageComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

