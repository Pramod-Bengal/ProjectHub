# Deployment Instructions for ProjectHub

This project consists of a Node.js backend (using Express and Nodemailer) and a static frontend (HTML/CSS/JS). Because the backend and frontend are in the same repository and the server is configured to serve the static files, you can deploy them together as a single Web Service.

## Recommended: Deploy on Render (Free Tier Available)

Render is great for Node.js applications.

### Prerequisites (for GitHub deployment)
1. Push your code to a GitHub repository.
2. Ensure your `package.json` has a `start` script: `"start": "node server.js"` (Checked: ✅ It does).

### Steps to Deploy

1. **Sign Up/Login to Render**: Go to [render.com](https://render.com) and log in with your GitHub account.
2. **New Web Service**: Click "New +" -> "Web Service".
3. **Connect Repository**: Select your `ProjectHub` repository.
4. **Configure Service**:
   - **Name**: Give it a name (e.g., `project-hub-contact`).
   - **Region**: Choose one close to you (e.g., Singapore for India).
   - **Branch**: `main` (or `master`).
   - **Runtime**: `Node`.
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**:
   You MUST add your email credentials here for the email function to work.
   - Click "Advanced" or scroll to "Environment Variables".
   - Add key: `EMAIL_USER` value: `pramodbenagal@gmail.com`
   - Add key: `EMAIL_PASS` value: `pdexzrwcgzkgdjmc` (Use your App Password, NOT your Gmail login password).
6. **Deploy**: Click "Create Web Service".

Render will build your app (install dependencies) and start the server. Once live, you will get a URL (e.g., `https://project-hub-contact.onrender.com`).

## Alternative: Vercel (Frontend Only) + Backend Hosting
Since you have server-side code (`server.js`) for sending emails, you **cannot** deploy the full functionality to Vercel/Netlify freely unless you convert the backend to Serverless Functions (e.g., Vercel Functions).

If you want to use Vercel, you need to:
1. Move `server.js` logic to an `api/send-email.js` file (Vercel Serverless convention).
2. Configure `vercel.json`.

**Sticking to Render/Railway/Heroku is easier for the current setup.**

## Local Testing
1. Open terminal in the project folder.
2. Run `npm install` (to install dependencies like express, nodemailer).
3. Run `node server.js`.
4. Open `http://localhost:3000` in your browser.
