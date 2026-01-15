# 📚 Product Data Explorer - Full Stack Application

A modern, full-stack product exploration and web scraping application built with **NestJS**, **Next.js 15**, **Prisma**, and **PostgreSQL**. This application allows you to scrape product information from e-commerce websites, store it in a database, and explore it through a beautiful, responsive interface.

## ✨ Features

### Backend (NestJS + Prisma + Crawlee)
- 🕷️ **Web Scraping**: Automated scraping of product details using Playwright and Crawlee
- 📊 **Product Management**: Full CRUD operations for products
- 🔍 **Advanced Filtering**: Search, filter by price range, author, and more
- 📄 **Pagination**: Efficient data loading with pagination support
- 📈 **Statistics**: Product analytics and insights
- 🗄️ **Database**: PostgreSQL with Prisma ORM
- 🔗 **RESTful API**: Well-structured API endpoints

### Frontend (Next.js 15 + TypeScript + Tailwind CSS)
- 🎨 **Modern UI**: Beautiful, gradient-rich design with smooth animations
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🔍 **Real-time Search**: Instant product search and filtering
- 💰 **Price Filters**: Filter products by price range
- 🎯 **Sort Options**: Sort by price, title, or date added
- 📦 **Product Cards**: Eye-catching product cards with images and details
- 🖼️ **Product Modal**: Detailed product view with all scraped information
- ➕ **Scraper Form**: Easy-to-use form to add new products
- ⚡ **Fast Performance**: Optimized with Next.js 15 features

### Product Details Scraped
- Title, Author, Price, Product Image
- Description, ISBN, Publisher
- Publication Date, Format
- Number of Pages, Language
- Dimensions, Rating, Review Count
- Availability Status

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 6
- **Scraping**: Crawlee 3.15 + Playwright 1.57

### Frontend
- **Framework**: Next.js 15.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Image Optimization**: Next.js Image

## 📁 Folder Structure

\`\`\`
Product Data Explorer/
├── backend/
│   ├── src/
│   │   ├── products/          # Product CRUD & filtering
│   │   ├── scrape/            # Web scraping logic
│   │   │   └── crawlers/      # Playwright crawlers
│   │   ├── prisma.service.ts  # Database service
│   │   └── main.ts            # App entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   └── ScraperForm.tsx
│   │   ├── page.tsx           # Main page
│   │   └── globals.css        # Styles & animations
│   └── package.json
│
└── README.md
\`\`\`

## 🚀 Quick Start

### Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL URL
npx prisma migrate dev
npm run start:dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Visit **http://localhost:3001** (frontend) and **http://localhost:3000** (backend API)

## 📚 API Endpoints

- \`GET /products\` - List all products (with filters)
- \`GET /products/:id\` - Get product details
- \`GET /products/stats\` - Get statistics
- \`POST /scrape/product\` - Scrape new product
- \`DELETE /products/:id\` - Delete product

## 🎯 Usage

1. **Add Products**: Paste product URL → Click "Scrape Product"
2. **Search**: Type keywords to filter instantly
3. **Filter**: Set price ranges and sort options
4. **View Details**: Click any product card for full information

---

**Built with ❤️ using modern web technologies**

Setup steps

Running commands

Deployment

Contributing

License
