import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { PlayerLayoutComponent } from './layouts/player-layout/player-layout.component';

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
        path: 'teachers/:publicId',
        loadComponent: () => import('./features/public/teacher-profile/teacher-profile.component').then((m) => m.TeacherProfileComponent),
      },
      {
        path: 'certificates/verify',
        loadComponent: () => import('./features/public/certificate-verify/certificate-verify.component').then((m) => m.CertificateVerifyComponent),
      },
      {
        path: 'certificates/verify/:code',
        loadComponent: () => import('./features/public/certificate-verify/certificate-verify.component').then((m) => m.CertificateVerifyComponent),
      },
      {
        path: 'payment/callback',
        loadComponent: () => import('./features/payment/callback/payment-callback.component').then((m) => m.PaymentCallbackComponent),
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
    path: 'dashboard/student',
    component: StudentLayoutComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./features/student/profile/student-profile.component').then((m) => m.StudentProfileComponent),
      },
      {
        path: 'learning',
        loadComponent: () => import('./features/student/learning/student-learning.component').then((m) => m.StudentLearningComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./features/student/wishlist/student-wishlist.component').then((m) => m.StudentWishlistComponent),
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/student/orders/student-orders.component').then((m) => m.StudentOrdersComponent),
      },
      {
        path: 'flashcards',
        loadComponent: () => import('./features/student/flashcards/flashcards-hub.component').then((m) => m.FlashcardsHubComponent),
      },
      {
        path: 'certificates',
        loadComponent: () => import('./features/student/certificates/earned-certificates.component').then((m) => m.EarnedCertificatesComponent),
      },
    ],
  },
  {
    path: '',
    component: PlayerLayoutComponent,
    children: [
      {
        path: 'payment/checkout/:courseId',
        loadComponent: () => import('./features/payment/checkout/checkout.component').then((m) => m.CheckoutComponent),
      },
      {
        path: 'dashboard/student/learning/:courseId/lessons/:lessonId',
        loadComponent: () => import('./features/student/player/learning-player.component').then((m) => m.LearningPlayerComponent),
      },
      {
        path: 'dashboard/student/flashcards/:setId/review',
        loadComponent: () => import('./features/student/flashcard-trainer/flashcard-trainer.component').then((m) => m.FlashcardTrainerComponent),
      },
      {
        path: 'dashboard/student/learning/:courseId/exams/:examId',
        loadComponent: () => import('./features/student/timed-exam/timed-exam.component').then((m) => m.TimedExamComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
