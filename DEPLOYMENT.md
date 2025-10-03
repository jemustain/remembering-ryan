# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" in the top right corner and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `remembering-ryan`
   - **Description**: `Memorial website for Ryan William Alf featuring stories for his son`
   - **Visibility**: Choose "Public" or "Private" (your preference)
   - **DON'T** check "Add a README file" (we already have one)
   - **DON'T** check "Add .gitignore" (we already have one)
   - **DON'T** choose a license yet (you can add one later)
4. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/remembering-ryan.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Automatic (Recommended)
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select the `remembering-ryan` repository
5. Vercel will auto-detect it's a Next.js project
6. Click "Deploy"
7. Your site will be live in 2-3 minutes!

### Option B: Manual Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `rememberingryan.com`)
4. Follow DNS setup instructions

## Step 5: Environment Variables (if needed later)

If you add features requiring environment variables:
1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add any needed variables

## Automatic Deployments

Once connected, every time you push to the `main` branch on GitHub, Vercel will automatically deploy the changes to your live site!

## Quick Commands Reference

```bash
# To add new content and deploy:
git add .
git commit -m "Add new story: [story name]"
git push

# To check deployment status:
vercel --prod
```

Your memorial website will be live and accessible to family and friends once deployed!
