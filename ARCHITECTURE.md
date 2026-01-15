# 🏗️ Project Architecture & Structure

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    http://localhost:3001                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 FRONTEND                           │
│                      (Port 3001)                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Components:                                                │ │
│  │  • ProductCard.tsx    - Display product cards               │ │
│  │  • ProductModal.tsx   - Show detailed product view          │ │
│  │  • ScraperForm.tsx    - Form to scrape new products         │ │
│  │  • page.tsx           - Main page with all features         │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Features:                                                  │ │
│  │  • Real-time search & filtering                             │ │
│  │  • Sort by price/title/date                                 │ │
│  │  • Responsive grid layout                                   │ │
│  │  • Product detail modal                                     │ │
│  │  • Statistics dashboard                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ REST API Calls
                            │ (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NESTJS BACKEND                               │
│                      (Port 3000)                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Controllers:                                               │ │
│  │  • ProductController   - /products endpoints                │ │
│  │  • ScrapeController    - /scrape/product endpoint           │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Services:                                                  │ │
│  │  • ProductService      - Business logic for products        │ │
│  │  • ScrapeService       - Orchestrate scraping process       │ │
│  │  • PrismaService       - Database connection                │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Crawlers:                                                  │ │
│  │  • product.crawler.ts  - Playwright web scraping logic      │ │
│  │    - Extract title, author, price, image                    │ │
│  │    - Extract ISBN, publisher, description                   │ │
│  │    - Extract rating, reviews, availability                  │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Prisma ORM
                            │ (Type-safe queries)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Tables:                                                    │ │
│  │  • Product                                                  │ │
│  │    - id, sourceId, title, author, price                     │ │
│  │    - imageUrl, sourceUrl, createdAt, updatedAt              │ │
│  │                                                             │ │
│  │  • ProductDetail (related to Product)                       │ │
│  │    - id, productId, description, isbn                       │ │
│  │    - publisher, publicationDate, format, pages              │ │
│  │    - language, dimensions, rating, reviewCount              │ │
│  │    - availability, createdAt, updatedAt                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Diagram

### 1. Scraping Flow
```
User Input URL
     │
     ▼
ScraperForm
     │
     ▼
POST /scrape/product
     │
     ▼
ScrapeService
     │
     ▼
product.crawler.ts (Playwright)
     │
     ├─► Navigate to URL
     ├─► Extract title
     ├─► Extract author
     ├─► Extract price
     ├─► Extract image
     ├─► Extract description
     ├─► Extract ISBN
     ├─► Extract publisher
     └─► Extract ratings
     │
     ▼
ProductService.createProduct()
     │
     ▼
Prisma upsert (Database)
     │
     ▼
Return Product Data
     │
     ▼
Success Message + Refresh List
```

### 2. Product Listing Flow
```
User Opens Page
     │
     ▼
page.tsx (useEffect)
     │
     ▼
GET /products?search=...&minPrice=...
     │
     ▼
ProductController.getAll()
     │
     ▼
ProductService.getAllProducts()
     │
     ├─► Build WHERE clause
     ├─► Apply search filter
     ├─► Apply price filter
     ├─► Apply sorting
     └─► Apply pagination
     │
     ▼
Prisma.findMany()
     │
     ▼
Return {products[], pagination}
     │
     ▼
Render ProductCard components
```

### 3. Product Detail Flow
```
User Clicks ProductCard
     │
     ▼
setSelectedProduct(product)
     │
     ▼
ProductModal renders
     │
     ├─► Show large image
     ├─► Show full details
     ├─► Show ratings
     ├─► Show description
     └─► Show external link
```

---

## Folder Structure

```
Product Data Explorer/
│
├── backend/                          # NestJS Backend
│   ├── src/
│   │   ├── products/                 # Product Module
│   │   │   ├── product.controller.ts # REST endpoints
│   │   │   ├── product.service.ts    # Business logic
│   │   │   └── products.module.ts    # Module definition
│   │   │
│   │   ├── scrape/                   # Scraping Module
│   │   │   ├── scrape.controller.ts  # Scrape endpoint
│   │   │   ├── scrape.service.ts     # Scraping orchestration
│   │   │   ├── scrape.module.ts      # Module definition
│   │   │   └── crawlers/
│   │   │       └── product.crawler.ts # Playwright logic
│   │   │
│   │   ├── app.module.ts             # Root module
│   │   ├── main.ts                   # Entry point
│   │   ├── prisma.service.ts         # Database service
│   │   └── prisma.module.ts          # Prisma module
│   │
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Migration history
│   │
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Environment template
│   ├── package.json                  # Dependencies
│   ├── tsconfig.json                 # TypeScript config
│   └── BACKEND_API.md                # API documentation
│
├── frontend/                         # Next.js 15 Frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx       # Product card component
│   │   │   ├── ProductModal.tsx      # Detail modal component
│   │   │   └── ScraperForm.tsx       # Scraping form component
│   │   │
│   │   ├── page.tsx                  # Main page
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles + animations
│   │
│   ├── public/                       # Static assets
│   ├── package.json                  # Dependencies
│   ├── tsconfig.json                 # TypeScript config
│   ├── next.config.ts                # Next.js config
│   └── tailwind.config.js            # Tailwind config
│
├── docs/                             # Additional documentation
├── README.md                         # Project overview
├── SETUP_GUIDE.md                    # Setup instructions
├── FEATURES.md                       # Feature documentation
├── IMPLEMENTATION_SUMMARY.md         # What was built
├── CHECKLIST.md                      # Quick start checklist
└── setup.sh                          # Automated setup script
```

---

## Data Flow

### Create/Update Product
```
URL Input → Scraper → Parser → Upsert → Database → Response
```

### Read Products
```
Query Params → Service → Filter/Sort → Database → Format → Response
```

### Delete Product
```
Product ID → Service → Database (CASCADE delete details) → Response
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  Next.js 15 + React + Tailwind CSS  │
│  • ProductCard                       │
│  • ProductModal                      │
│  • ScraperForm                       │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│         Application Layer           │
│      NestJS + TypeScript            │
│  • Controllers (Routing)             │
│  • Services (Business Logic)         │
│  • DTOs (Data Transfer Objects)      │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│         Data Access Layer           │
│         Prisma ORM                  │
│  • Schema Definition                 │
│  • Type Generation                   │
│  • Query Builder                     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│         Database Layer              │
│         PostgreSQL                  │
│  • Product table                     │
│  • ProductDetail table               │
│  • Relations & Indexes               │
└─────────────────────────────────────┘
```

---

## API Endpoints Map

```
Backend (http://localhost:3000)
│
├── /products
│   ├── GET    /                 # List all products (with filters)
│   ├── GET    /stats            # Get statistics
│   ├── GET    /:id              # Get single product
│   ├── POST   /                 # Create product (manual)
│   └── DELETE /:id              # Delete product
│
└── /scrape
    └── POST   /product          # Scrape from URL
```

---

## Component Hierarchy

```
App (page.tsx)
│
├── Header
│   ├── Logo
│   ├── Title
│   └── StatCards (3)
│
├── ScraperForm
│   ├── URL Input
│   ├── Scrape Button
│   ├── Success Message
│   └── Error Message
│
├── Filters Section
│   ├── Search Input
│   ├── Min Price Input
│   ├── Max Price Input
│   ├── Sort By Select
│   ├── Sort Order Select
│   ├── Clear Filters Button
│   └── Active Filter Badges
│
├── Products Grid
│   └── ProductCard (multiple)
│       ├── Product Image
│       ├── Price Badge
│       ├── Title
│       ├── Author
│       ├── Rating Stars
│       └── View Details Button
│
└── ProductModal
    ├── Modal Overlay
    ├── Modal Content
    │   ├── Header (title, author, close button)
    │   ├── Image Section
    │   ├── Price & Availability
    │   ├── Rating Display
    │   ├── Description
    │   ├── Product Details Table
    │   └── External Link Button
    └── Click Outside Handler
```

---

## Database Schema Relationships

```
Product (1) ←──────→ (1) ProductDetail
    │                       │
    ├─ id (PK)             ├─ id (PK)
    ├─ sourceId (UNIQUE)   ├─ productId (FK, UNIQUE)
    ├─ title               ├─ description
    ├─ author              ├─ isbn
    ├─ price               ├─ publisher
    ├─ imageUrl            ├─ publicationDate
    ├─ sourceUrl (UNIQUE)  ├─ format
    ├─ createdAt           ├─ pages
    └─ updatedAt           ├─ language
                           ├─ dimensions
                           ├─ rating
                           ├─ reviewCount
                           ├─ availability
                           ├─ createdAt
                           └─ updatedAt

CASCADE DELETE: When Product is deleted, ProductDetail is automatically deleted
```

---

## Security & Best Practices

### Backend
- ✅ Environment variables for sensitive data
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling
- ✅ Type safety with TypeScript
- ✅ Prepared statements (Prisma prevents SQL injection)

### Frontend
- ✅ Validated user inputs
- ✅ Error boundaries
- ✅ Loading states
- ✅ No sensitive data in frontend
- ✅ External links with rel="noopener noreferrer"

### Database
- ✅ Unique constraints
- ✅ Foreign key relationships
- ✅ Cascading deletes
- ✅ Timestamps for auditing
- ✅ Indexed fields for performance

---

**This architecture provides a scalable, maintainable, and professional foundation for the Product Data Explorer application! 🏗️**
