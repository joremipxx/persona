# Persona Builder - Backend

A Nest.js backend API for the Persona Builder application, providing CRUD operations for persona data with Supabase integration.

## 🚀 Features

- **RESTful API** for persona management
- **TypeScript** for type safety
- **Supabase** integration for data persistence
- **Validation** with class-validator
- **CORS** enabled for frontend integration
- **Environment** configuration

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your Supabase credentials:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Personas
- `GET /api/personas` - Get all personas (optional `userId` query parameter)
- `GET /api/personas/:id` - Get persona by ID
- `GET /api/personas/:id/frontend-format` - Get persona in frontend format
- `POST /api/personas` - Create new persona
- `PATCH /api/personas/:id` - Update persona
- `DELETE /api/personas/:id` - Delete persona

## 🗄️ Database Schema

The application uses a `personas` table in Supabase with the following structure:

```sql
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT,
  age INTEGER,
  gender TEXT,
  location TEXT,
  profession TEXT,
  industry TEXT,
  company_size TEXT,
  experience_years INTEGER,
  income TEXT,
  career_level TEXT,
  career_goals TEXT[],
  challenges TEXT[],
  preferred_tools TEXT[],
  communication_preferences TEXT[],
  social_networks TEXT[],
  content_interests TEXT[],
  pain_points TEXT,
  motivations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Testing

```bash
npm run test
```

## 📝 API Documentation

The API follows RESTful conventions and uses standard HTTP status codes:

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

All requests and responses use JSON format.

## 🔧 Configuration

The application can be configured using environment variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration modules
│   ├── config.module.ts
│   └── supabase.service.ts
├── modules/                # Feature modules
│   └── persona/
│       ├── persona.module.ts
│       ├── persona.controller.ts
│       └── persona.service.ts
├── common/                 # Shared resources
│   ├── dto/               # Data transfer objects
│   └── interfaces/        # TypeScript interfaces
├── app.module.ts          # Root module
└── main.ts               # Application entry point
```
