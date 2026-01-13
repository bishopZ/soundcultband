# Soundcult Band Website

Official website for Soundcult band at https://soundcultband.com

## Overview

This is the official website for Soundcult, featuring a public marketing site and a private admin area. The public site is a single-page marketing website, while the admin area provides authentication-protected functionality.

## Tech Stack

### Frontend
- Build Tool: Vite
- Static Typing: TypeScript
- UI Framework: React
- State Management: Redux Toolkit
- Routing: React Router
- Design System: Chakra UI

### Backend
- Server Runtime: Node.js
- Web Framework: Express
- Template Engine: EJS
- Authentication Library: Passport.js

## Getting Started

### Development Setup

1. Clone the repository: `git clone <repository-url>`
2. Create a `.env` file in the root directory with:
   - `LOCAL_STORAGE_KEY="your-secret-key"` - Used to encrypt client-side data
   - `SESSION_SECRET="your-session-secret"` - Used to sign session cookies
   - `PORT=3000` - Server port (optional, defaults to 3000)
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Visit http://localhost:3000 to view the site

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Check TypeScript types
- `npm run test:e2e` - Run Cypress E2E tests
- `npm run test:e2e:open` - Open Cypress test runner

## Project Structure

```
src/
├── client/                 # Frontend React application
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── shared/             # Client-side utilities
│   └── styles/             # CSS files
│
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Custom middleware
│   ├── routes/             # Route definitions
│   ├── services/           # Business logic
│   └── templates/          # EJS templates
│
cypress/                    # E2E tests
```

## Deployment

### Environment Variables

The following environment variables are required:
- `LOCAL_STORAGE_KEY` - Encryption key for local storage
- `SESSION_SECRET` - Session signing secret
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Production Build

```bash
npm run build
npm start
```

## License

MIT
