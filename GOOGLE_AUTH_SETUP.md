# Google Authentication Setup

This project now includes Google authentication for family-protected stories and user analytics.

## Environment Variables

You'll need to add these environment variables to your `.env.local` file:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin emails (comma-separated)
ADMIN_EMAILS="your-email@example.com,another-admin@example.com"
```

## Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable the Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
5. **Copy the Client ID and Client Secret** to your `.env.local` file

## Vercel Deployment

When deploying to Vercel:

1. **Set environment variables** in your Vercel project settings:
   - `NEXTAUTH_SECRET` - Generate a random string
   - `NEXTAUTH_URL` - Your Vercel domain (e.g., `https://your-app.vercel.app`)
   - `GOOGLE_CLIENT_ID` - From Google Console
   - `GOOGLE_CLIENT_SECRET` - From Google Console
   - `ADMIN_EMAILS` - Comma-separated list of admin emails
   - `DATABASE_URL` - You'll need to set up a production database

2. **Update Google OAuth settings**:
   - Add your Vercel domain to authorized redirect URIs
   - Example: `https://your-app.vercel.app/api/auth/callback/google`

## Database Setup

For development:
```bash
npx prisma generate
npx prisma db push
```

For production, you'll want to use a proper database like:
- **Vercel Postgres** (recommended for Vercel deployments)
- **PlanetScale** (MySQL)
- **Railway** (PostgreSQL)
- **Supabase** (PostgreSQL)

## Features

### Family Protection
- Stories in the `familyStories` array in `components/FamilyOnly.js` require authentication
- Users are assigned roles: `GUEST`, `FAMILY`, or `ADMIN`
- Only `FAMILY` and `ADMIN` users can view protected stories

### User Analytics
- Admin dashboard at `/admin` shows:
  - Total users and their roles
  - User login activity
  - Story view statistics
  - Individual user story viewing history
- Ability to change user roles from the admin panel

### Automatic Role Assignment
- Users listed in `ADMIN_EMAILS` automatically get `ADMIN` role
- All other users start as `FAMILY` role
- Admins can change roles as needed

## Managing Family Stories

To make a story family-only, wrap it with the `FamilyOnly` component:

```jsx
import FamilyOnly from '../../../components/FamilyOnly'

<FamilyOnly storySlug="story-slug">
  # Your Story Content
  ...
</FamilyOnly>
```

Or add the story slug to the `familyStories` array in `components/FamilyOnly.js`.

## Security Notes

- Never commit your `.env.local` file
- Use strong random strings for `NEXTAUTH_SECRET`
- Regularly review user access in the admin panel
- Consider setting up email notifications for new user registrations
