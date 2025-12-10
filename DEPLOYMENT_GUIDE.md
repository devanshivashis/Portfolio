# Deployment Guide

This portfolio is built with **React**, **Vite**, and **Tailwind CSS**. It is a "Static Site" which means it can be hosted for free on many platforms.

## Option 1: Replit (Easiest)
1. Click the **"Deploy"** button in the top right of the Replit editor.
2. Choose **"Static"** or **"Autoscale"**.
3. Follow the payment/setup prompts. Replit handles everything.

## Option 2: Vercel (Free & Popular)
1. **Download your code**:
   - In Replit, click the project name/menu in the top left.
   - Select **"Download as Zip"**.
   - Extract the zip file to a folder on your computer.

2. **Upload to GitHub**:
   - Create a new repository on [GitHub.com](https://github.com).
   - Push your code to this repository.

3. **Deploy on Vercel**:
   - Go to [Vercel.com](https://vercel.com) and sign up/login.
   - Click **"Add New..."** -> **"Project"**.
   - Select your GitHub repository.
   - Vercel will detect it's a **Vite** project automatically.
   - Click **"Deploy"**.

## Option 3: Netlify (Free Alternative)
1. Follow the same "Download" and "GitHub" steps as above.
2. Go to [Netlify.com](https://netlify.com).
3. Click **"Add new site"** -> **"Import from an existing project"**.
4. Connect GitHub and select your repo.
5. Click **"Deploy"**.

## Build Commands (If asked)
- **Framework Preset**: Vite
- **Build Command**: `npm run build` (or `vite build`)
- **Output Directory**: `dist`
