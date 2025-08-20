# Persona Builder - Paradox Group

A French persona builder application with Supabase integration for data persistence.

## Features

- **7-Step Persona Creation Process**: Guided workflow to create detailed personas
- **Professional Design**: Dark theme with modern UI components
- **Data Persistence**: Supabase integration for saving and loading personas
- **Export Functionality**: Export personas as JSON files
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Form Validation**: Zod + React Hook Form
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd persona
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Set Up Supabase

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set Environment Variables**:
   ```bash
   cd client
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Database Schema**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `database/schema.sql`
   - Execute the SQL to create the personas table

### 4. Start Development Server

```bash
npm run dev
```

This will start both the client and server (if you have one configured).

## Database Schema

The application uses a single `personas` table with the following structure:

- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to users table)
- **persona_name**: Text
- **avatar_id**: Integer (1-12)
- **age_range**: Text
- **education_level**: Text
- **professional_sector**: Text
- **organization_size**: Text
- **job_title**: Text
- **job_measured_by**: Text
- **reports_to**: Text
- **goals**: Text
- **biggest_challenges**: Text Array
- **responsibilities**: Text
- **tools**: Text Array
- **communication_preference**: Text
- **information_gathering**: Text
- **social_networks**: Text Array

## Project Structure

```
persona/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── store/         # Zustand store
│   │   ├── services/      # Database services
│   │   ├── lib/           # Utilities and config
│   │   └── types/         # TypeScript types
│   └── database/          # Database schema
├── server/                # Backend (if needed)
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run install:all` - Install all dependencies

## Authentication

Currently, the application uses a mock user ID for database operations. To implement real authentication:

1. Set up Supabase Auth
2. Replace the mock user ID in `PersonaOverview.tsx`
3. Add authentication components and flows

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to Paradox Group.
