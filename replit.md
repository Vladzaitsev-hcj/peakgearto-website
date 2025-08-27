# Peak Gear TO - E-commerce Rental Platform

## Overview

Peak Gear TO is a modern e-commerce rental platform specializing in roof-top cargo boxes and bike carriers for adventure-seekers and campers in the Greater Toronto Area. The platform operates from a central warehouse in Brampton and provides a complete rental experience with user authentication, product browsing, booking management, payment processing, and both customer and admin dashboards.

The application is built as a full-stack TypeScript solution with a React frontend and Express.js backend, designed to handle the complete rental workflow from product discovery to payment and delivery coordination.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing with conditional rendering based on authentication status
- **State Management**: React Query (@tanstack/react-query) for server state management and caching, with React hooks for local state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Design System**: Forest Green (#2E5E4E) primary color, Sunny Orange (#FF9F1C) accent color, with Poppins font family for clean, modern aesthetics

### Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API endpoints
- **Authentication**: Integration with Replit Auth using OpenID Connect with session-based authentication stored in PostgreSQL
- **API Structure**: Resource-based REST endpoints for products, bookings, waivers, and user management
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless for production scalability
- **ORM**: Drizzle ORM with full TypeScript support for type-safe database operations
- **Schema Design**: 
  - Users table (mandatory for Replit Auth integration)
  - Products table with JSONB specifications and array fields for car compatibility
  - Bookings table with date ranges and delivery options
  - Waivers table for liability management
  - Sessions table for authentication state

### Authentication & Authorization
- **User Authentication**: Replit Auth integration with OpenID Connect protocol
- **Session Security**: HTTP-only cookies with secure flags and 1-week TTL
- **Access Control**: Route-level protection with middleware authentication checks
- **User Onboarding**: Digital waiver requirement before first booking

### Payment Integration
- **Payment Processor**: PayPal API integration for secure checkout
- **Pricing Logic**: Dynamic calculation including daily rates, security deposits, and delivery fees
- **Booking Confirmation**: Automated PDF generation for rental agreements

### File Upload & Assets
- **Static Assets**: Served via Express with proper MIME type handling
- **Product Images**: Support for multiple images per product with fallback system
- **Document Generation**: PDF generation for rental agreements and waivers

### Development Workflow
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Development Server**: Hot reloading with Vite integration in Express

## External Dependencies

### Core Framework Dependencies
- **Frontend**: React, Vite, Wouter for routing, @tanstack/react-query for state management
- **Backend**: Express.js, TypeScript runtime via tsx
- **UI Components**: Radix UI primitives, Tailwind CSS, Shadcn/ui component library

### Database & ORM
- **Database**: Neon PostgreSQL serverless with connection pooling
- **ORM**: Drizzle ORM with PostgreSQL dialect and Zod integration for validation
- **Session Store**: connect-pg-simple for PostgreSQL session storage

### Authentication Services
- **Provider**: Replit Auth with OpenID Connect
- **Session Management**: Express-session with secure cookie configuration
- **Security**: Passport.js integration for OAuth flows

### Payment Processing
- **Payment Gateway**: PayPal API for transaction processing
- **Security**: HTTPS enforcement and secure payment token handling

### Development Tools
- **Build Tools**: Vite, esbuild, PostCSS with Tailwind
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint integration via Vite plugins
- **Debugging**: Replit-specific development tools and error overlay

### Utility Libraries
- **Date Handling**: date-fns for date calculations and formatting
- **Form Management**: React Hook Form with Zod validation
- **Styling**: clsx and tailwind-merge for conditional classes
- **Icons**: Lucide React for consistent iconography