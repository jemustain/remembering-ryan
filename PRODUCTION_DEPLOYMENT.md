# 🚀 Production Database Deployment Guide

## Quick Summary
This guide helps you set up a FREE production PostgreSQL database with Vercel and configure all necessary environment variables.

---

## 📊 Option 1: Vercel Postgres (RECOMMENDED - Easiest)

### ✅ Why Vercel Postgres?
- **Free tier**: 60 hours compute/month, 256 MB storage
- **Auto-configured**: Environment variables set automatically
- **Integrated**: Works seamlessly with your Vercel deployment
- **No separate account needed**: Uses your existing Vercel account

### 📝 Setup Steps

#### 1. Create Database in Vercel
1. Go to https://vercel.com/dashboard
2. Select your project: `remembering-ryan`
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose **Hobby (Free)** tier
7. Click **Create**

#### 2. Environment Variables (Auto-Set by Vercel)
Vercel automatically adds these to your project:
```
POSTGRES_PRISMA_URL          # Use this for Prisma
POSTGRES_URL                 # Direct connection
POSTGRES_URL_NON_POOLING     # For migrations
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

#### 3. Add Additional Environment Variables in Vercel
Go to **Settings** > **Environment Variables** and add:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Google OAuth (same as local)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Emails
ADMIN_EMAILS=your-email@example.com,other-admin@example.com

# Database (if not using POSTGRES_PRISMA_URL)
DATABASE_URL=${POSTGRES_PRISMA_URL}
```

#### 4. Generate NextAuth Secret
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

#### 5. Update Google OAuth Authorized Redirect URIs
1. Go to https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client
3. Add to **Authorized redirect URIs**:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

#### 6. Deploy and Run Migrations
```bash
# Push changes to GitHub
git add .
git commit -m "Configure production database"
git push origin main

# Vercel will auto-deploy
# Then run migrations in Vercel CLI or project settings
```

Or run migrations directly:
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull

# Run migration
npx prisma migrate deploy
```

---

## 📊 Option 2: Supabase (More Features, Generous Free Tier)

### ✅ Why Supabase?
- **More generous free tier**: 500 MB database, 2GB bandwidth
- **Additional features**: Realtime subscriptions, storage, auth
- **PostgreSQL**: Full-featured PostgreSQL database
- **Dashboard**: Nice UI for managing data

### 📝 Setup Steps

#### 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/Login with GitHub
3. Click **New Project**
4. Choose organization or create one
5. Project settings:
   - Name: `remembering-ryan`
   - Database Password: (save this securely!)
   - Region: Choose closest to your users
6. Click **Create new project** (takes ~2 minutes)

#### 2. Get Database Connection String
1. In Supabase Dashboard, go to **Settings** > **Database**
2. Scroll to **Connection string**
3. Select **URI** mode
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

#### 3. Add to Vercel Environment Variables
Go to Vercel Dashboard > Your Project > **Settings** > **Environment Variables**:

```bash
# Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Emails
ADMIN_EMAILS=your-email@example.com
```

#### 4. Deploy
```bash
git add .
git commit -m "Configure production database with Supabase"
git push origin main
```

---

## 🔧 Local Development with Production DB

### Keep Local SQLite for Development
Your `.env.local` is already configured for local SQLite:
```bash
DATABASE_URL="file:./dev.db"
```

### Test Production Database Locally (Optional)
If you want to test with the production database:
```bash
# Create .env.production.local
DATABASE_URL="postgresql://..."  # Your production URL
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# Run with production env
npm run build
npm start
```

---

## 🗄️ Database Migration Commands

### Run Migrations on Production
```bash
# After deploying, run migrations
npx prisma migrate deploy

# Or generate Prisma Client
npx prisma generate
```

### Reset Database (DANGER - Deletes All Data)
```bash
npx prisma migrate reset
```

### View Database in Prisma Studio
```bash
npx prisma studio
```

---

## ✅ Environment Variables Checklist

Make sure these are set in **Vercel Dashboard**:

- [ ] `DATABASE_URL` or `POSTGRES_PRISMA_URL`
- [ ] `NEXTAUTH_SECRET` (generate new one for production)
- [ ] `NEXTAUTH_URL` (your production URL)
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `ADMIN_EMAILS`

---

## 🆘 Troubleshooting

### Issue: "Can't reach database server"
- Check your `DATABASE_URL` format
- Ensure database is active (Supabase/Vercel)
- Verify connection pooling settings

### Issue: "Invalid credentials"
- Double-check password in connection string
- Ensure no spaces or special chars are URL-encoded

### Issue: "Table doesn't exist"
- Run `npx prisma migrate deploy`
- Or `npx prisma db push` for direct schema push

### Issue: Google OAuth not working
- Verify redirect URI in Google Console
- Check `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is set

---

## 💰 Cost Comparison

| Provider | Free Tier | Paid Tier |
|----------|-----------|-----------|
| **Vercel Postgres** | 60h compute/month, 256MB | $24/month for unlimited |
| **Supabase** | 500MB, 2GB bandwidth | $25/month for 8GB |
| **Railway** | $5 free credit/month | $5/month minimum |
| **Neon** | 3GB storage, 100h compute | $19/month |

**Recommendation**: Start with **Vercel Postgres** for easiest integration, or **Supabase** if you want more storage.

---

## 🎉 Final Steps

1. ✅ Create database (Vercel Postgres or Supabase)
2. ✅ Add environment variables in Vercel Dashboard
3. ✅ Update Google OAuth redirect URIs
4. ✅ Deploy to Vercel
5. ✅ Run `npx prisma migrate deploy`
6. ✅ Test your site!

---

## 📚 Useful Links

- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/guides/database/postgresql)
- [NextAuth.js Environment Variables](https://next-auth.js.org/configuration/options#environment-variables)
