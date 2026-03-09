# 🚀 Complete Deployment Guide — Netlify + Render + Supabase

This guide will walk you through deploying Webenablix **completely free** (within free tier limits). No prior deployment experience needed.

---

## Overview

We'll use 3 free services:
- **Netlify** → Frontend (React app)
- **Render** → Backend (Node.js API)
- **Supabase** → Database (PostgreSQL)

**Total time:** ~20 minutes

---

## Prerequisites

1. A **GitHub account** → [Sign up free](https://github.com/signup)
2. Your project code pushed to GitHub (we'll do this first)

---

## Step 1: Push Your Code to GitHub

If you haven't already pushed your code:

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `webenablix`
3. Choose **Public** or **Private**
4. Click **Create repository**
5. In your local project folder, open a terminal and run:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/webenablix.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Set Up Database (Supabase)

### 2.1 Create Account
1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project** → Sign in with GitHub
3. Authorize Supabase

### 2.2 Create New Project
1. Click **New Project**
2. Fill in:
   - **Name:** `webenablix-db`
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you
   - **Pricing Plan:** Free
3. Click **Create new project** (takes ~2 minutes)

### 2.3 Get Connection String
1. Once ready, go to **Project Settings** (⚙️ icon on left sidebar)
2. Click **Database** tab
3. Scroll to **Connection string** → select **URI**
4. Copy the connection string (looks like `postgresql://postgres:[YOUR-PASSWORD]@...`)
5. Replace `[YOUR-PASSWORD]` with the actual password you created
6. **Save this connection string** — you'll need it in Step 3

---

## Step 3: Deploy Backend (Render)

### 3.1 Create Account
1. Go to [render.com](https://render.com)
2. Click **Get Started** → Sign in with GitHub
3. Authorize Render to access your repositories

### 3.2 Create Web Service
1. On Render dashboard, click **New +** → **Web Service**
2. Find `webenablix` repository → click **Connect**
3. Render auto-detects the configuration from `render.yaml`
4. Click **Apply** (this uses your render.yaml settings)

### 3.3 Set Environment Variables
Before deploying, you need to set secret values:

1. On the service page, go to **Environment** tab
2. Click **Add Environment Variable** for each of these:

| Key | Value | Where to get it |
|-----|-------|-----------------|
| `DATABASE_URL` | Your Supabase connection string | From Step 2.3 |
| `ADMIN_PASSWORD` | Choose a strong password (save it!) | Create your own |
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID | See Step 6 (optional for now) |
| `FRONTEND_URL` | Leave blank for now | We'll add this in Step 5 |

3. Click **Save Changes**

### 3.4 Deploy
1. Click **Manual Deploy** → **Deploy latest commit**
2. Wait 3-5 minutes (watch the logs)
3. Once you see "Server listening on port 10000" → SUCCESS! ✅
4. **Copy your Render URL** (top of page, looks like `https://webenablix-backend.onrender.com`)

**Important:** The first deploy runs the database migration automatically.

---

## Step 4: Deploy Frontend (Netlify)

### 4.1 Create Account
1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up** → Sign up with GitHub
3. Authorize Netlify

### 4.2 Deploy Site
1. Click **Add new site** → **Import an existing project**
2. Choose **Deploy with GitHub**
3. Authorize Netlify (if asked)
4. Select your `webenablix` repository
5. Netlify auto-detects settings from `netlify.toml` — you'll see:
   - **Base directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `frontend/dist`

### 4.3 Add Environment Variables
Before deploying, click **Show advanced** → **New variable**:

| Key | Value |
|-----|-------|
| `VITE_BACKEND_URL` | Your Render backend URL from Step 3.4 |
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth client ID (optional) |

### 4.4 Deploy
1. Click **Deploy site**
2. Wait 2-3 minutes
3. Once done, you'll see a random URL like `https://sparkly-unicorn-abc123.netlify.app`
4. Click **Site settings** → **Change site name** → choose a name like `webenablix`
5. Your site is now at `https://webenablix.netlify.app` 🎉

**Copy your Netlify URL** — you need it for the next step.

---

## Step 5: Connect Frontend & Backend

The backend needs to know your frontend URL for security (CORS).

1. Go back to **Render dashboard** → open your backend service
2. Go to **Environment** tab
3. Find `FRONTEND_URL` → click **Edit**
4. Paste your Netlify URL (e.g., `https://webenablix.netlify.app`)
5. Click **Save Changes**
6. Render will automatically redeploy (~2 minutes)

---

## Step 6: Google OAuth Setup (Optional)

If you want "Sign in with Google" to work:

### 6.1 Create Google OAuth App
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project: **Webenablix**
3. Go to **APIs & Services** → **OAuth consent screen**
4. Choose **External** → click **Create**
5. Fill in:
   - **App name:** Webenablix
   - **User support email:** Your email
   - **Developer email:** Your email
6. Click **Save and Continue** (skip scopes, test users)

### 6.2 Create Credentials
1. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
2. Application type: **Web application**
3. Name: `Webenablix Web Client`
4. **Authorized JavaScript origins:**
   - `https://webenablix.netlify.app` (your Netlify URL)
5. **Authorized redirect URIs:**
   - `https://webenablix.netlify.app`
6. Click **Create**
7. **Copy the Client ID** (looks like `123456.apps.googleusercontent.com`)

### 6.3 Add to Render
1. Render dashboard → your backend service → **Environment**
2. Edit `GOOGLE_CLIENT_ID` → paste the Client ID → **Save**

### 6.4 Add to Netlify
1. Netlify dashboard → your site → **Site settings** → **Environment variables**
2. Add variable:
   - Key: `VITE_GOOGLE_CLIENT_ID`
   - Value: Your Client ID
3. Click **Save**
4. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## Step 7: Test Your Deployment

1. Visit your Netlify URL: `https://webenablix.netlify.app`
2. Click around — everything should work!
3. Try creating an account or logging in
4. Run an audit on a website
5. Go to `/login` → click **Admin** tab → login with:
   - Username: `admin`
   - Password: The `ADMIN_PASSWORD` you set in Step 3.3

---

## ✅ You're Done!

Your app is now live at:
- **Frontend:** `https://webenablix.netlify.app`
- **Backend:** `https://webenablix-backend.onrender.com`
- **Admin Panel:** `https://webenablix.netlify.app/login` (Admin tab)

---

## 📊 Free Tier Limits

| Service | Free Tier |
|---------|-----------|
| **Netlify** | 100 GB bandwidth/month, unlimited sites |
| **Render** | 750 hours/month (your backend will sleep after 15 min inactivity, wakes on request) |
| **Supabase** | 500 MB database, 2 GB bandwidth, unlimited API requests |

**Note:** Render free tier services "sleep" after 15 minutes of inactivity. The first request after sleep takes ~30 seconds to wake up.

---

## 🔄 How to Update Your Deployment

When you make code changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature X"
   git push
   ```

2. **Automatic deployment:**
   - Render: Detects the push and redeploys automatically
   - Netlify: Detects the push and rebuilds automatically

No manual steps needed! 🎉

---

## 🐛 Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify `DATABASE_URL` is correct (Settings → Environment)
- Re-run migration: Settings → Manual Deploy

### Frontend can't connect to backend
- Check `VITE_BACKEND_URL` in Netlify environment variables
- Verify `FRONTEND_URL` is set on Render
- Check browser console for CORS errors

### Database connection failed
- Verify Supabase password is correct in `DATABASE_URL`
- Check Supabase project is not paused (free tier pauses after 1 week inactivity)

### Google login doesn't work
- Verify `GOOGLE_CLIENT_ID` matches on both Render and Netlify
- Check Authorized origins in Google Cloud Console match your Netlify URL exactly

---

## 💡 Pro Tips

1. **Custom domain:** Netlify lets you add a custom domain for free (in Site settings)
2. **Monitor usage:** Check your dashboards weekly to stay within free limits
3. **Branch deploys:** Netlify can auto-deploy preview sites for each git branch
4. **Render logs:** Tail logs in real-time: Service → Logs tab
5. **Database backups:** Supabase auto-backs up daily on free tier

---

## 📚 Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)
- [Supabase Docs](https://supabase.com/docs)
