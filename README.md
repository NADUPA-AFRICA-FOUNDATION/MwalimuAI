# Mwalimu AI - Teacher Professional Development Platform

## Overview

Mwalimu AI is an AI-powered professional development platform designed specifically for Kenyan teachers implementing the Competency-Based Curriculum (CBC). The platform combines structured learning modules, personalized AI coaching, community collaboration, and progress tracking to support teachers' continuous professional development.

## Features

### 1. **Learning Modules** (`/dashboard/modules`)
- Structured courses covering CBC fundamentals, assessment strategies, and pedagogy
- Content organized by difficulty level (beginner, intermediate, advanced)
- Progress tracking and estimated completion times
- Multiple learning formats (video, text, interactive, quiz)

### 2. **AI Coach Chat** (`/dashboard/ai-coach`)
- Real-time conversational AI assistant powered by OpenAI GPT-4
- Context-aware guidance on CBC implementation
- Instant answers to teaching challenges
- Personalized learning recommendations
- Suggested questions to help get started

### 3. **Needs Assessment** (`/dashboard/assessment`)
- Comprehensive questionnaire to evaluate teacher needs
- Multi-step assessment with progress tracking
- Covers CBC familiarity, assessment skills, challenges, and learning preferences
- Results guide personalized learning paths

### 4. **Community Forum** (`/dashboard/community`)
- Connect with fellow educators
- Share experiences and resources
- Discuss teaching challenges
- Browse community posts by category

### 5. **Learning Resources** (`/dashboard/resources`)
- Downloadable PDF guides and toolkits
- Video content and tutorials
- Ready-to-use templates
- Curriculum implementation guides

### 6. **Achievements & Badges** (`/dashboard/achievements`)
- Track professional development progress
- Earn badges for completing milestones
- Gamification to motivate continuous learning

### 7. **User Settings** (`/dashboard/settings`)
- Profile management
- Notification preferences
- Account security
- Data management

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

### Backend & Services
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Vercel AI SDK 6 + OpenAI GPT-4
- **API Routes**: Next.js Route Handlers

### Key Dependencies
- `ai` ^6.0.0 - Vercel AI SDK for LLM integration
- `@ai-sdk/react` ^3.0.0 - React hooks for AI features
- `@supabase/supabase-js` ^2.46.1 - Supabase client
- `@supabase/ssr` ^0.5.0 - SSR support for Supabase

## Project Structure

```
/app
  /auth
    /login - Login page
    /sign-up - Registration page
    /callback - OAuth/email callback handler
    /error - Auth error page
  /dashboard
    /ai-coach - AI coach chat interface
    /modules - Learning modules catalog
    /assessment - Needs assessment questionnaire
    /community - Community forum
    /achievements - Achievement badges
    /resources - Learning resources
    /settings - User settings
    layout.tsx - Dashboard layout with header & sidebar
    page.tsx - Dashboard home/overview
  /api
    /chat - AI chat endpoint
  page.tsx - Landing page
  layout.tsx - Root layout

/components
  /ui - shadcn/ui components
  dashboard-header.tsx - Dashboard header with logout
  sidebar-nav.tsx - Navigation sidebar

/lib
  /supabase
    client.ts - Browser Supabase client
    server.ts - Server Supabase client
    middleware.ts - Token refresh middleware
  utils.ts - Utility functions

/scripts
  001_create_tables.sql - Database schema migration
  setup-db.py - Database setup script (Python)

/public - Static assets

middleware.ts - Next.js middleware for auth
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account and project
- OpenAI API key (via Vercel AI Gateway)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repo-url>
   cd mwalimu-ai
   pnpm install
   ```

2. **Set up environment variables** (`.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

3. **Set up Supabase database**:
   ```bash
   # Option 1: Execute SQL migration via Supabase dashboard
   # Copy contents of scripts/001_create_tables.sql and run in SQL editor
   
   # Option 2: Use Python setup script
   cd scripts
   python setup-db.py
   ```

4. **Run development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables
- `public.profiles` - Teacher profiles and metadata
- `public.modules` - Learning modules and courses
- `public.lessons` - Individual lessons within modules
- `public.user_progress` - Progress tracking for modules/lessons
- `public.needs_assessments` - Needs assessment responses
- `public.chat_conversations` - AI coach chat history
- `public.community_posts` - Forum posts
- `public.community_replies` - Forum replies
- `public.resources` - Learning resources
- `public.badges` - Achievement badges
- `public.user_badges` - User badge tracking

All tables include Row Level Security (RLS) policies to ensure users can only access their own data.

## AI Chat API

### Endpoint
`POST /api/chat`

### Request Body
```json
{
  "messages": [
    {
      "role": "user",
      "content": "How do I implement formative assessment?",
      "parts": [...]
    }
  ]
}
```

### System Prompt
The AI coach is specialized in:
- CBC fundamentals and implementation
- Competency-based assessment techniques
- Formative assessment methods
- Inclusive teaching practices
- Digital integration in classrooms
- Kenyan education context

## Authentication Flow

1. User registers at `/auth/sign-up`
2. Email confirmation sent (or bypass in dev mode)
3. User redirected to `/auth/callback` to exchange code for session
4. Session stored in HTTP-only cookie via middleware
5. Authenticated users can access `/dashboard` pages

## Deployment

### Vercel Deployment
```bash
pnpm run build
vercel deploy
```

Set environment variables in Vercel project settings.

### Manual Deployment
1. Build: `pnpm run build`
2. Start: `pnpm start`
3. Server runs on specified PORT (default 3000)

## Development Guidelines

### Adding New Pages
1. Create new route in `/app/dashboard/[feature]/page.tsx`
2. Page is automatically protected via middleware
3. Add to sidebar navigation in `components/sidebar-nav.tsx`

### Adding New Database Tables
1. Create migration SQL in `/scripts/00X_description.sql`
2. Add RLS policies for security
3. Run migration through Supabase dashboard or script

### Styling
- Use Tailwind CSS utility classes
- Follow design tokens in `/app/globals.css`
- Import UI components from `@/components/ui`

## API Routes

### `/api/chat` (POST)
AI coach endpoint for streaming chat responses.

**Request:**
- `messages`: Array of chat messages with role and content

**Response:**
- Streaming response with AI-generated messages

## Common Issues

### Database Connection Errors
- Verify Supabase connection strings in `.env.local`
- Check RLS policies aren't too restrictive
- Confirm user is authenticated

### AI Chat Not Working
- Verify OpenAI/AI Gateway API key
- Check `/api/chat` route exists
- Ensure messages format is correct

### Authentication Issues
- Confirm email confirmation link works
- Check redirect URL matches environment
- Verify cookies are enabled

## Future Enhancements

- [ ] Video content integration
- [ ] Interactive quizzes with scoring
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Real-time notifications
- [ ] Resource library with upload
- [ ] Advanced search and filtering
- [ ] Teacher collaboration workspaces
- [ ] Integration with education management systems
- [ ] Offline mode for learning modules

## Support

For issues or questions:
1. Check the [FAQ](/dashboard/resources)
2. Browse community forum at `/dashboard/community`
3. Contact support at support@mwalimuai.com

## License

Proprietary - Mwalimu AI Platform

## Contributing

This is a professional development platform. Contributions follow our community guidelines.

---

**Last Updated**: April 2026
**Version**: 1.0.0
