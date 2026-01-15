# 🚀 Product Data Explorer - Complete Setup Guide

## Prerequisites Installation

### 1. Install Node.js (if not installed)
\`\`\`bash
# Check if Node.js is installed
node --version

# If not installed, download from: https://nodejs.org/ (v18 or higher)
\`\`\`

### 2. Install PostgreSQL (if not installed)
\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Download from: https://www.postgresql.org/download/windows/
\`\`\`

### 3. Create Database
\`\`\`bash
# Access PostgreSQL
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE product_explorer;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE product_explorer TO your_username;
\q
\`\`\`

## Step-by-Step Installation

### Backend Setup

1. **Navigate to backend directory**
\`\`\`bash
cd backend
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Configure environment variables**
\`\`\`bash
cp .env.example .env
\`\`\`

Edit the \`.env\` file:
\`\`\`env
PORT=3000
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/product_explorer?schema=public"
FRONTEND_URL="http://localhost:3001"
\`\`\`

4. **Run database migrations**
\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
\`\`\`

5. **Start backend server**
\`\`\`bash
npm run start:dev
\`\`\`

✅ Backend should now be running on **http://localhost:3000**

### Frontend Setup

1. **Open new terminal and navigate to frontend**
\`\`\`bash
cd frontend
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start frontend development server**
\`\`\`bash
npm run dev
\`\`\`

✅ Frontend should now be running on **http://localhost:3001**

## Verification

1. **Check Backend**: Visit http://localhost:3000/products
   - Should return: \`{"products": [], "pagination": {...}}\`

2. **Check Frontend**: Visit http://localhost:3001
   - Should display the Product Explorer interface

3. **Test Scraping**:
   - Copy a product URL (e.g., from worldofbooks.com)
   - Paste in the "Add New Product" form
   - Click "Scrape Product"
   - Product should appear in the grid

## Common Issues & Solutions

### Database Connection Error
**Problem**: Can't connect to database
**Solution**:
- Verify PostgreSQL is running: \`sudo service postgresql status\`
- Check DATABASE_URL in .env file
- Ensure database exists: \`psql -U postgres -l\`

### Port Already in Use
**Problem**: Port 3000 or 3001 is already in use
**Solution**:
- Backend: Change PORT in backend/.env
- Frontend: Run \`npm run dev -- -p 3002\`

### Prisma Client Error
**Problem**: Cannot find Prisma Client
**Solution**:
\`\`\`bash
cd backend
npx prisma generate
\`\`\`

### Image Loading Issues
**Problem**: Product images not showing
**Solution**: Check next.config.ts has remotePatterns configured

### CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Verify CORS is enabled in backend/src/main.ts

## Development Commands

### Backend
\`\`\`bash
npm run start:dev      # Development mode with hot reload
npm run build          # Build for production
npm run start:prod     # Run production build
npx prisma studio      # Open database GUI
\`\`\`

### Frontend
\`\`\`bash
npm run dev           # Development mode
npm run build         # Build for production
npm run start         # Run production build
npm run lint          # Run linter
\`\`\`

## Database Management

### View Data
\`\`\`bash
cd backend
npx prisma studio
\`\`\`
Opens at http://localhost:5555

### Reset Database
\`\`\`bash
cd backend
npx prisma migrate reset
\`\`\`

### Create New Migration
\`\`\`bash
cd backend
# After changing schema.prisma:
npx prisma migrate dev --name your_migration_name
\`\`\`

## Testing the Application

### 1. Scrape a Product
- Go to http://localhost:3001
- Find a product URL (e.g., from worldofbooks.com)
- Paste it in the "Product URL" field
- Click "Scrape Product"
- Wait for success message
- Product appears in the grid

### 2. Search Products
- Type in the search box
- Results filter instantly
- Try searching by title or author

### 3. Filter by Price
- Set minimum price
- Set maximum price
- Results update automatically

### 4. View Product Details
- Click any product card
- Modal opens with full details
- View all scraped information
- Click "View on Original Site" to open source

### 5. Sort Products
- Change "Sort By" to price/title/date
- Change "Order" to ascending/descending
- Grid reorders automatically

## Production Deployment

### Backend (Example: Heroku)
\`\`\`bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql
git push heroku main
\`\`\`

### Frontend (Example: Vercel)
\`\`\`bash
cd frontend
vercel deploy
# Update API URL in code to production backend URL
\`\`\`

## Environment Variables Summary

### Backend (.env)
\`\`\`env
PORT=3000
DATABASE_URL="postgresql://..."
FRONTEND_URL="http://localhost:3001"
\`\`\`

### Frontend (.env.local) - Optional
\`\`\`env
NEXT_PUBLIC_API_URL="http://localhost:3000"
\`\`\`

## Architecture Overview

\`\`\`
┌─────────────┐         ┌──────────────┐         ┌────────────┐
│   Browser   │ ──────▶ │  Next.js 15  │ ──────▶ │  NestJS    │
│  (Client)   │ ◀────── │  (Frontend)  │ ◀────── │  (Backend) │
└─────────────┘         └──────────────┘         └────────────┘
                        Port: 3001                Port: 3000
                                                        │
                                                        ▼
                                                  ┌──────────┐
                                                  │PostgreSQL│
                                                  │ Database │
                                                  └──────────┘
\`\`\`

## Features Checklist

- ✅ Product scraping from URLs
- ✅ Store products in PostgreSQL
- ✅ Search by title/author
- ✅ Filter by price range
- ✅ Sort by price/title/date
- ✅ View detailed product information
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Smooth animations and transitions
- ✅ Real-time search feedback
- ✅ Loading states and error handling
- ✅ Product statistics dashboard
- ✅ External links to source websites

## Support & Resources

- **NestJS Documentation**: https://docs.nestjs.com
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Crawlee Documentation**: https://crawlee.dev

## Next Steps

After successful setup:

1. **Customize Scraper**: Modify \`backend/src/scrape/crawlers/product.crawler.ts\` for different websites
2. **Add More Fields**: Extend Prisma schema for additional product data
3. **Enhance UI**: Customize colors and styles in \`frontend/app/globals.css\`
4. **Add Authentication**: Implement user accounts and favorites
5. **Deploy**: Deploy to production hosting

---

**Happy Coding! 🚀**

For issues or questions, check the troubleshooting section or review the code comments.
