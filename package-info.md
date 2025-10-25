# Package.json Documentation

## Project Overview
This is an **Angular monorepo** managed by **Nx** workspace, using npm as the package manager.

- **Name**: `@angular-monorepo/source`
- **Version**: 0.0.0
- **License**: MIT
- **Nx Version**: 21.0.3
- **Angular Version**: ~19.2.0

---

## NPM Scripts

### `npm run compodoc`
Generates documentation for the Angular project using Compodoc.
- Command: `npx compodoc -p tsconfig.doc.json`
- Uses the TypeScript configuration file `tsconfig.doc.json` to analyze the codebase

### `npm run commit`
Provides an interactive commit interface using Commitizen for conventional commits.
- Command: `git-cz`
- Helps maintain consistent commit message formatting

### `npm run source-map-analyzer`
Analyzes the bundle size of the built application.
- Command: `npx nx build rose --configuration=analyze-bundle && npx source-map-explorer dist/apps/rose/**/*.js`
- First builds the 'rose' app with bundle analysis configuration
- Then visualizes the JavaScript bundle sizes using source-map-explorer

---

## Dependencies

### Core Angular Packages
- **@angular/common**: Common Angular utilities and directives
- **@angular/compiler**: Angular template compiler
- **@angular/core**: Core Angular framework
- **@angular/forms**: Form handling and validation
- **@angular/google-maps**: Google Maps integration for Angular
- **@angular/platform-browser**: Browser-specific rendering
- **@angular/platform-browser-dynamic**: Dynamic bootstrapping for browser
- **@angular/platform-server**: Server-side rendering support
- **@angular/router**: Angular routing library
- **@angular/ssr**: Server-side rendering utilities

### State Management
- **@ngrx/store**: Redux-inspired state management for Angular
- **@ngrx/effects**: Side effects model for @ngrx/store

### UI & Styling
- **primeng**: Rich UI component library for Angular
- **@primeng/themes**: Theming system for PrimeNG
- **primeflex**: Flexbox-based CSS utility library
- **primeicons**: Icon library for PrimeNG

### Internationalization
- **@ngx-translate/core**: Internationalization (i18n) library for Angular
- **@ngx-translate/http-loader**: HTTP loader for @ngx-translate

### Utilities & Libraries
- **chart.js**: JavaScript charting library
- **google-libphonenumber**: Phone number parsing and validation
- **intl-tel-input**: International telephone input component
- **ngx-cookie-service-ssr**: Cookie service with SSR support
- **auth-api-kp**: Custom authentication API library
- **express**: Web server framework for Node.js (used for SSR)
- **rxjs**: Reactive programming library
- **zone.js**: Execution context for asynchronous operations

### Development Tools
- **git-cz**: Commitizen adapter for git
- **install**: NPM package installer
- **npm**: Node package manager

---

## DevDependencies

### Angular Development Tools
- **@angular-devkit/build-angular**: Angular build system
- **@angular-devkit/core**: Core utilities for Angular DevKit
- **@angular-devkit/schematics**: Schematic engine for code generation
- **@angular/cli**: Angular command-line interface
- **@angular/compiler-cli**: Angular compiler for CLI
- **@angular/language-service**: Angular language service for IDEs
- **@schematics/angular**: Angular schematics collection
- **angular-eslint**: ESLint plugin for Angular

### Nx Workspace Tools
- **@nx/angular**: Nx plugin for Angular applications
- **@nx/devkit**: Nx DevKit for plugin development
- **@nx/eslint**: ESLint integration for Nx
- **@nx/eslint-plugin**: Custom ESLint rules for Nx
- **@nx/jest**: Jest integration for Nx
- **@nx/js**: JavaScript/TypeScript support for Nx
- **@nx/playwright**: Playwright e2e testing integration
- **@nx/web**: Web application support for Nx
- **@nx/workspace**: Core Nx workspace utilities
- **nx**: Nx CLI and core
- **nx-cloud**: Nx Cloud for distributed caching and CI

### Testing
- **@playwright/test**: End-to-end testing framework
- **jest**: JavaScript testing framework
- **jest-environment-jsdom**: JSDOM environment for Jest
- **jest-preset-angular**: Jest preset for Angular projects
- **ts-jest**: TypeScript preprocessor for Jest
- **eslint-plugin-playwright**: ESLint rules for Playwright

### Code Quality & Linting
- **eslint**: JavaScript/TypeScript linter
- **@eslint/js**: ESLint JavaScript configurations
- **typescript-eslint**: TypeScript support for ESLint
- **@typescript-eslint/utils**: Utilities for TypeScript ESLint
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **prettier**: Code formatter
- **@prettier/plugin-xml**: Prettier plugin for XML formatting

### Documentation
- **@compodoc/compodoc**: Documentation generator for Angular applications

### Build & Compilation
- **@swc/core**: Fast TypeScript/JavaScript compiler
- **@swc/helpers**: Helper functions for SWC
- **@swc-node/register**: SWC Node.js register hook
- **typescript**: TypeScript language compiler
- **ts-node**: TypeScript execution environment for Node.js
- **tslib**: TypeScript runtime library

### Bundle Analysis
- **source-map-explorer**: Analyzes and visualizes JavaScript bundle sizes

### Type Definitions
- **@types/express**: TypeScript definitions for Express
- **@types/jest**: TypeScript definitions for Jest
- **@types/node**: TypeScript definitions for Node.js

---

## Configuration

### Commitizen
The project uses Commitizen with the `git-cz` adapter for conventional commits.
- Path: `git-cz`
- Run with: `npm run commit`

---

## Usage Notes

### Starting Development Server
Since this is an Nx workspace, use Nx commands directly:
```bash
nx serve rose              # Start the main rose app
nx serve rose-dashboard    # Start the dashboard app
```

### Building Applications
```bash
nx build rose              # Build the rose app
nx build rose-dashboard    # Build the dashboard app
```

### Running Tests
```bash
nx test <project-name>     # Run unit tests
nx e2e <project-name>      # Run e2e tests
```

### Running All Tasks
```bash
nx run-many -t build       # Build all projects
nx run-many -t test        # Test all projects
```

---

## Project Structure
This monorepo contains the following applications:
- **rose**: Main application
- **rose-dashboard**: Dashboard application
- **rose-e2e**: E2E tests for rose app
- **rose-dashboard-e2e**: E2E tests for dashboard app
- **environment**: Environment configuration app/library
