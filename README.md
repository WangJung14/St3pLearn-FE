# St3pLearn Frontend (`st3p-learn-frontend`)

This repository contains the Angular frontend foundation for the **St3pLearn** learning platform.

## 1. Project Overview

The `st3p-learn-frontend` project is built using modern Angular architecture (Standalone components, Standalone routing, SCSS styling foundation, strict TypeScript). It communicates with the backend microservices ecosystem through a centralized API Gateway (`http://localhost:8080`).

## 2. Technology Stack

- **Framework**: Angular 21 (Standalone Architecture)
- **Language**: TypeScript (Strict Mode)
- **Routing**: Angular Router (Standalone Routing)
- **Styles**: SCSS / Sass (Modern `@use` / `@forward` Architecture)
- **Linting & Formatting**: ESLint (`@angular-eslint`) & Prettier
- **Package Manager**: npm

## 3. Prerequisites

- **Node.js**: `>= 20.0.0`
- **npm**: `>= 10.0.0`

## 4. Installation

Clone the repository and install dependencies:

```bash
npm install
```

## 5. Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 6. Production Build

Build the project for production:

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## 7. Linting

Run ESLint to check for code quality and template issues:

```bash
npm run lint
```

## 8. Code Formatting

Check formatting with Prettier:

```bash
npm run format:check
```

Format code automatically with Prettier:

```bash
npm run format
```

## 9. Project Structure

```text
src/
├── app/
│   ├── core/           # Infrastructure & application-wide services (config, auth, guards, interceptors, models, services)
│   ├── shared/         # Reusable building blocks (components, directives, pipes, validators, types)
│   ├── layouts/        # Layout wrappers (public-layout, main-layout, admin-layout)
│   ├── features/       # Business feature domains (auth, home, courses, learning, payment, profile, admin)
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts
│   └── app.routes.ts
│
├── environments/       # Environment configurations (environment.ts, environment.prod.ts)
│
├── styles/             # Global SCSS Architecture
│   ├── abstracts/      # SCSS variables, mixins, functions
│   ├── base/           # CSS reset, typography defaults
│   └── _index.scss     # SCSS architecture entrypoint
│
├── assets/             # Static assets
├── index.html
├── main.ts
└── styles.scss
```

## 10. Architecture Principles

1. **Standalone Architecture**: Employs standalone components, directives, and routing without legacy `NgModule` boilerplate.
2. **Modular SCSS Structure**: Global styles follow modular SCSS architecture (`abstracts` and `base`) using `@use` / `@forward` rules.
3. **Gateway-Centric API Configuration**: All environment configurations target the unified API Gateway (`http://localhost:8080`), prohibiting hardcoded microservice ports.
4. **Strict Type Safety**: Strict TypeScript compiler checks enabled to ensure high code quality.
5. **Clean Separation of Concerns**: Core infrastructure (`@core`), shared utilities (`@shared`), layout wrappers (`@layouts`), and business domain modules (`@features`) remain distinctly isolated.
