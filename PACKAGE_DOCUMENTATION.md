# 📦 Package.json Documentation

## 📋 Project Metadata

- **Name**: `@angular-monorepo/source`
- **Version**: `0.0.0`
- **License**: MIT
- **Type**: Private monorepo

## 🚀 Available Scripts

### `npm run compodoc`
📚 Generates comprehensive documentation for the Angular application using Compodoc.
- Uses `tsconfig.doc.json` configuration
- Creates interactive documentation with component diagrams, dependency graphs, and API references

### `npm run commit`
✍️ Interactive commit message creator using Commitizen
- Enforces conventional commit messages
- Ensures consistent commit history
- Prompts for commit type, scope, and description

### `npm run source-map-analyzer`
🔍 Analyzes bundle sizes and dependencies
- Builds the Rose app with bundle analysis configuration
- Opens interactive source-map-explorer to visualize bundle composition
- Helps identify large dependencies and optimization opportunities

## 📦 Production Dependencies

### Core Angular Framework (v19.2.0)
- **@angular/common** - Common Angular directives, pipes, and utilities
- **@angular/compiler** - Angular template compiler
- **@angular/core** - Core Angular framework functionality
- **@angular/forms** - Form handling (template-driven & reactive)
- **@angular/platform-browser** - Browser-specific rendering
- **@angular/platform-browser-dynamic** - JIT compilation for development
- **@angular/platform-server** - Server-side rendering support
- **@angular/router** - Routing and navigation
- **@angular/ssr** - Server-side rendering utilities

### State Management
- **@ngrx/store** (v19.2.1) - Redux-inspired state management
- **@ngrx/effects** (v19.2.1) - Side effect management for NgRx

### UI & Styling
- **primeng** (v19.1.3) - Rich UI component library
- **@primeng/themes** (v19.1.3) - Theming system for PrimeNG
- **primeicons** (v7.0.0) - Icon library for PrimeNG
- **primeflex** (v4.0.0) - CSS utility library
- **chart.js** (v4.5.0) - Charting library for data visualization

### Internationalization
- **@ngx-translate/core** (v16.0.4) - Translation framework
- **@ngx-translate/http-loader** (v16.0.1) - HTTP loader for translations

### Maps & Location
- **@angular/google-maps** (v19.2.19) - Google Maps integration
- **google-libphonenumber** (v3.2.42) - Phone number validation
- **intl-tel-input** (v19.5.7) - International telephone input

### Utilities
- **rxjs** (v7.8.0) - Reactive programming library
- **express** (v4.21.2) - Web server for SSR
- **ngx-cookie-service-ssr** (v19.1.2) - SSR-compatible cookie service
- **auth-api-kp** (v0.1.7) - Custom authentication API
- **zone.js** (v0.15.0) - Execution context for Angular

### Development Tools (in production)
- **git-cz** (v4.9.0) - Commitizen CLI for conventional commits
- **npm** (v11.4.0) - Package manager
- **install** (v0.13.0) - Package installation utility

## 🛠️ Development Dependencies

### Angular Development Tools
- **@angular/cli** (v19.2.0) - Angular command-line interface
- **@angular/compiler-cli** (v19.2.0) - Ahead-of-time compiler
- **@angular/language-service** (v19.2.0) - IDE language support
- **@angular-devkit/build-angular** (v19.2.0) - Build system
- **@angular-devkit/core** (v19.2.0) - Core devkit utilities
- **@angular-devkit/schematics** (v19.2.0) - Code generation
- **@schematics/angular** (v19.2.0) - Angular schematics

### Nx Workspace Tools (v21.0.3)
- **nx** - Nx CLI and core functionality
- **@nx/angular** (v20.1.4) - Angular plugin for Nx
- **@nx/devkit** - Nx devkit for custom plugins
- **@nx/eslint** - ESLint integration
- **@nx/eslint-plugin** - Custom Nx ESLint rules
- **@nx/jest** - Jest testing integration
- **@nx/js** - JavaScript/TypeScript plugin
- **@nx/playwright** - Playwright E2E testing
- **@nx/web** - Web application support
- **@nx/workspace** - Workspace utilities
- **nx-cloud** (v19.1.0) - Distributed caching and CI optimization

### Testing
- **jest** (v29.7.0) - JavaScript testing framework
- **jest-environment-jsdom** (v29.7.0) - DOM testing environment
- **jest-preset-angular** (v14.4.0) - Jest configuration for Angular
- **ts-jest** (v29.1.0) - TypeScript support for Jest
- **@types/jest** (v29.5.12) - TypeScript definitions for Jest
- **@playwright/test** (v1.36.0) - End-to-end testing framework
- **eslint-plugin-playwright** (v1.6.2) - ESLint rules for Playwright

### Code Quality & Linting
- **eslint** (v9.8.0) - JavaScript/TypeScript linter
- **@eslint/js** (v9.8.0) - ESLint JavaScript configuration
- **angular-eslint** (v19.2.0) - Angular-specific ESLint rules
- **typescript-eslint** (v8.19.0) - TypeScript ESLint parser and rules
- **@typescript-eslint/utils** (v8.19.0) - TypeScript ESLint utilities
- **eslint-config-prettier** (v10.0.0) - Disables conflicting ESLint rules
- **prettier** (v3.6.2) - Code formatter
- **@prettier/plugin-xml** (v3.4.2) - XML formatting support

### Documentation
- **@compodoc/compodoc** (v1.1.26) - Angular documentation generator

### Build & Compilation
- **@swc/core** (v1.5.7) - Fast TypeScript/JavaScript compiler
- **@swc/helpers** (v0.5.11) - SWC runtime helpers
- **@swc-node/register** (v1.9.1) - SWC Node.js integration
- **typescript** (v5.7.2) - TypeScript compiler
- **ts-node** (v10.9.1) - TypeScript execution for Node.js
- **tslib** (v2.3.0) - TypeScript runtime library

### Analysis & Debugging
- **source-map-explorer** (v2.5.3) - Bundle size analysis tool

### Type Definitions
- **@types/express** (v4.17.21) - Express types
- **@types/node** (v18.16.9) - Node.js types

## ⚙️ Configuration

### Commitizen
```json
{
  "path": "git-cz"
}
```
Configures Commitizen to use git-cz adapter for conventional commits.

## 🏗️ Architecture

This is an **Nx monorepo** workspace containing:
- Angular applications (apps/)
- Shared libraries (libs/)
- Centralized configuration
- Distributed caching with Nx Cloud

## 🔧 Key Features

✨ **Server-Side Rendering (SSR)** - Full SSR support with Angular Universal
🌐 **Internationalization** - Multi-language support with ngx-translate
📊 **Data Visualization** - Charts and graphs with Chart.js
🗺️ **Maps Integration** - Google Maps functionality
🎨 **Rich UI Components** - PrimeNG component library with theming
🧪 **Comprehensive Testing** - Jest for unit tests, Playwright for E2E
📚 **Documentation** - Automated documentation with Compodoc
🔍 **Code Quality** - ESLint + Prettier + Angular ESLint
📦 **Bundle Analysis** - Source map explorer for optimization
🚀 **CI/CD Ready** - Nx Cloud integration for distributed builds
