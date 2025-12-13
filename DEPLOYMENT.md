# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend to Vercel in separate repositories.

## 📋 Prerequisites

1. Create a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI (optional): `npm install -g vercel`
3. Have your MongoDB Atlas connection string ready
4. Create two separate GitHub repositories:
   - One for the frontend (`nebs-notice-board-client`)
   - One for the backend (`nebs-notice-board-server`)

---

## 🚀 Backend Deployment (Server)

### Step 1: Prepare Backend Repository

1. **Create a new GitHub repository** for the backend
2. **Copy only the server folder contents** to the new repository:
   ```
   server/
   ├── models/
   ├── routes/
   ├── index.js
   ├── diagnose.js
   ├── test-api.js
   ├── test-db.js
   ├── package.json
   ├── vercel.json  (already created)
   └── .env.example (create this)
   ```

3. **Create `.env.example`** in the backend repo:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```

4. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial backend setup"
   git branch -M main
   git remote add origin <your-backend-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your backend GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `MONGO_URI` with your MongoDB Atlas connection string
   - Add `PORT` with value `5000`

6. Click **"Deploy"**

7. **Note your backend URL**: `https://your-backend.vercel.app`

### Step 3: Update CORS (Important!)

After deployment, update `server/index.js` to allow your frontend domain:

```javascript
// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
  credentials: true
}));
```

Redeploy after making this change.

---

## 🎨 Frontend Deployment (Client)

### Step 1: Prepare Frontend Repository

1. **Create a new GitHub repository** for the frontend
2. **Copy only the client folder contents** to the new repository:
   ```
   client/
   ├── src/
   ├── public/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── tailwind.config.js
   ├── postcss.config.js
   └── .env.production (create this)
   ```

3. **Create `.env.production`** in the frontend repo:
   ```env
   VITE_API_URL=https://your-backend.vercel.app
   ```

4. **Update API calls** to use environment variable:

   Create `client/src/config.js`:
   ```javascript
   export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

   Then update all API calls in your components to use:
   ```javascript
   import { API_URL } from './config';
   
   // Instead of: 'http://localhost:5000/api/notices'
   // Use: `${API_URL}/api/notices`
   ```

5. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial frontend setup"
   git branch -M main
   git remote add origin <your-frontend-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your frontend GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `VITE_API_URL` with your backend Vercel URL
   - Example: `https://your-backend.vercel.app`

6. Click **"Deploy"**

7. **Your app is live!** 🎉

---

## 🔄 Automatic Deployments

Both repositories will automatically redeploy when you push changes to the main branch.

### To Deploy Updates:

**Backend:**
```bash
git add .
git commit -m "Update backend"
git push
```

**Frontend:**
```bash
git add .
git commit -m "Update frontend"
git push
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend API is accessible at `https://your-backend.vercel.app/api/notices`
- [ ] Frontend loads at `https://your-frontend.vercel.app`
- [ ] Frontend can fetch data from backend (check Network tab)
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working

---

## 🐛 Troubleshooting

### Backend Issues

**1. "Internal Server Error" on Vercel**
- Check Vercel logs in the dashboard
- Verify `MONGO_URI` environment variable is set
- Ensure `vercel.json` is in the root of your backend repo

**2. CORS Errors**
- Update CORS configuration in `index.js`
- Add your frontend Vercel URL to allowed origins
- Redeploy backend after changes

**3. MongoDB Connection Fails**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check if connection string is correct
- Ensure database user has proper permissions

### Frontend Issues

**1. "Failed to Fetch" Errors**
- Verify `VITE_API_URL` environment variable is set
- Check if backend URL is correct
- Ensure backend is deployed and running

**2. API Calls to Localhost**
- Make sure you're using `API_URL` from config
- Rebuild and redeploy frontend
- Clear browser cache

**3. Build Fails**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Try building locally: `npm run build`

---

## 📝 Important Notes

1. **MongoDB Atlas**: Make sure to use MongoDB Atlas (cloud) instead of local MongoDB
2. **Environment Variables**: Never commit `.env` files to GitHub
3. **CORS**: Always update CORS settings when deploying to new domains
4. **Free Tier**: Vercel free tier has limitations on serverless function execution time
5. **Cold Starts**: First request to backend might be slow due to serverless cold starts

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Environment Variables on Vercel](https://vercel.com/docs/projects/environment-variables)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

---

**Need Help?** Check the Vercel deployment logs for detailed error messages.
