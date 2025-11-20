# Ashly Store - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites

1. GitHub account
2. Vercel account (sign up at vercel.com)
3. MongoDB Atlas database

### Step-by-Step Deployment

#### 1. Push to GitHub (Already Done ✅)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy on Vercel

**Option A: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Amr3011/Ashri`
4. Configure your project:

   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

5. **Environment Variables** - Add these:

   ```
   MONGODB_URI=mongodb+srv://amrosama376_db_user:UyzNhy5kqbmqGnIK@cluster0.l6vluv6.mongodb.net/ashly-store
   NODE_ENV=production
   PORT=5000
   ```

6. Click "Deploy"
7. Wait for deployment to complete (2-3 minutes)
8. You'll get a URL like: `https://ashri-xxxxx.vercel.app`

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ashly-store
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add MONGODB_URI
# Paste: mongodb+srv://amrosama376_db_user:UyzNhy5kqbmqGnIK@cluster0.l6vluv6.mongodb.net/ashly-store

vercel env add NODE_ENV
# Enter: production

# Deploy to production
vercel --prod
```

#### 3. Test Your Deployment

Once deployed, test these endpoints:

```bash
# Replace YOUR_VERCEL_URL with your actual URL

# Health check
curl https://YOUR_VERCEL_URL/api/health

# Get products
curl https://YOUR_VERCEL_URL/api/products

# Root endpoint
curl https://YOUR_VERCEL_URL/
```

---

## 📝 Important Notes

### MongoDB Connection

- Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Or add Vercel's IP addresses to whitelist

### File Uploads

⚠️ **Important**: Vercel has a read-only filesystem. Uploaded images won't persist between deployments.

**Solutions:**

1. **Use Cloudinary** (Recommended)
2. **Use AWS S3**
3. **Use Vercel Blob Storage**

For now, the current multer setup works but images will be lost on redeployment.

### Environment Variables in Vercel

After deployment, you can add/edit environment variables:

1. Go to your project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add:
   - `MONGODB_URI`
   - `NODE_ENV`
   - `PORT`

---

## 🔧 Common Issues

### Issue 1: MongoDB Connection Failed

**Solution**:

- Check MongoDB Atlas network access
- Allow access from anywhere (0.0.0.0/0)
- Verify connection string is correct

### Issue 2: 404 on API Routes

**Solution**:

- Ensure `vercel.json` is in root directory
- Redeploy the project

### Issue 3: Images Not Loading

**Solution**:

- Use external image hosting (Cloudinary/S3)
- Or use Vercel Blob Storage

---

## 📊 Monitoring

After deployment:

- **Logs**: Check Vercel dashboard → Your Project → Deployments → View Function Logs
- **Analytics**: Enable in Vercel dashboard
- **Errors**: Monitor in Real-time Functions logs

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel will auto-deploy!
```

---

## 🌐 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## ✅ Deployment Checklist

- [x] `vercel.json` created
- [x] `.vercelignore` created
- [x] `package.json` updated with engines
- [x] Server.js configured for production
- [ ] Push to GitHub
- [ ] Deploy on Vercel
- [ ] Add environment variables
- [ ] Test all endpoints
- [ ] (Optional) Set up Cloudinary for images
- [ ] (Optional) Add custom domain

---

**🎉 Your API is ready for production!**
