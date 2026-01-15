# 📘 Backend API Documentation

**Product Data Explorer – Backend**

This document describes all available backend APIs, their purpose, request/response formats, and how they work internally.

---

## 🔧 Base URL

```
http://localhost:3000
```

(Production URL will differ after deployment)

---

## 🧱 Tech Stack (Backend)

- **Framework:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Scraping:** Crawlee + Playwright
- **Architecture:** Modular, REST-based

---

## 📦 Core APIs Overview

| API               | Method | Purpose                                  |
| ----------------- | ------ | ---------------------------------------- |
| `/products`       | GET    | Fetch products with filters & pagination |
| `/products/:id`   | GET    | Get single product with full details     |
| `/products/stats` | GET    | Get product statistics                   |
| `/products/:id`   | DELETE | Delete a product                         |
| `/scrape/product` | POST   | Scrape & store product from URL          |

---

# 1️⃣ Get Products API (Enhanced with Filters)

### ➤ Fetch list of products with advanced filtering, search, and sorting

```
GET /products
```

### 🔸 Query Parameters

| Name        | Type   | Required | Description                                   |
| ----------- | ------ | -------- | --------------------------------------------- |
| `search`    | string | No       | Search by title or author (case-insensitive)  |
| `minPrice`  | number | No       | Minimum price filter                          |
| `maxPrice`  | number | No       | Maximum price filter                          |
| `author`    | string | No       | Filter by author name                         |
| `page`      | number | No       | Page number (default: 1)                      |
| `limit`     | number | No       | Items per page (default: 20)                  |
| `sortBy`    | string | No       | Sort field: 'price', 'title', 'createdAt'     |
| `sortOrder` | string | No       | Sort order: 'asc' or 'desc' (default: 'desc') |

### ✅ Example Request

```
GET /products?search=habits&minPrice=10&maxPrice=50&sortBy=price&sortOrder=asc&page=1&limit=10
```

### ✅ Example Response

```json
{
  "products": [
    {
      "id": "0574d763-416e-4bf2-90ac-149403868c83",
      "sourceId": "atomic-habits-book-james-clear-9781847941831",
      "title": "Atomic Habits",
      "author": "James Clear",
      "price": 14.09,
      "imageUrl": "https://www.worldofbooks.com/cdn/shop/files/1847941834.jpg",
      "sourceUrl": "https://www.worldofbooks.com/.../atomic-habits-book-james-clear-9781847941831",
      "createdAt": "2026-01-10T12:05:48.726Z",
      "updatedAt": "2026-01-10T12:05:48.726Z",
      "details": {
        "id": "det-123",
        "productId": "0574d763-416e-4bf2-90ac-149403868c83",
        "description": "Transform your life with tiny changes...",
        "isbn": "9781847941831",
        "publisher": "Random House",
        "publicationDate": "2018-10-18",
        "format": "Paperback",
        "pages": 320,
        "language": "English",
        "dimensions": "216 x 135 x 21mm",
        "rating": 4.8,
        "reviewCount": 15420,
        "availability": "In Stock"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 🧠 How it works (internal)

- Reads data from PostgreSQL using Prisma
- Supports full-text search on title and author
- Price range filtering
- Dynamic sorting by any field
- Pagination with total count
- Includes related ProductDetail data

---

# 2️⃣ Get Single Product API

### ➤ Get detailed information about a specific product

```
GET /products/:id
```

### 🔸 URL Parameters

| Name | Type   | Required | Description  |
| ---- | ------ | -------- | ------------ |
| `id` | string | Yes      | Product UUID |

### ✅ Example Request

```
GET /products/0574d763-416e-4bf2-90ac-149403868c83
```

### ✅ Example Response

```json
{
  "id": "0574d763-416e-4bf2-90ac-149403868c83",
  "sourceId": "atomic-habits-book-james-clear-9781847941831",
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 14.09,
  "imageUrl": "https://www.worldofbooks.com/cdn/shop/files/1847941834.jpg",
  "sourceUrl": "https://www.worldofbooks.com/.../atomic-habits-book-james-clear-9781847941831",
  "createdAt": "2026-01-10T12:05:48.726Z",
  "updatedAt": "2026-01-10T12:05:48.726Z",
  "details": {
    "id": "det-123",
    "description": "Transform your life with tiny changes that deliver remarkable results...",
    "isbn": "9781847941831",
    "publisher": "Random House",
    "publicationDate": "2018-10-18",
    "format": "Paperback",
    "pages": 320,
    "language": "English",
    "dimensions": "216 x 135 x 21mm",
    "rating": 4.8,
    "reviewCount": 15420,
    "availability": "In Stock"
  }
}
```

---

# 3️⃣ Get Product Statistics API

### ➤ Get aggregated statistics about all products

```
GET /products/stats
```

### ✅ Example Response

```json
{
  "totalProducts": 127,
  "avgPrice": 18.45,
  "minPrice": 3.99,
  "maxPrice": 89.99,
  "totalAuthors": 98
}
```

### 🧠 How it works

- Counts total products in database
- Calculates average, min, and max price
- Counts unique authors

---

# 4️⃣ Delete Product API

### ➤ Delete a product and its details from database

```
DELETE /products/:id
```

### 🔸 URL Parameters

| Name | Type   | Required | Description  |
| ---- | ------ | -------- | ------------ |
| `id` | string | Yes      | Product UUID |

### ✅ Example Request

```
DELETE /products/0574d763-416e-4bf2-90ac-149403868c83
```

### ✅ Example Response

```json
{
  "id": "0574d763-416e-4bf2-90ac-149403868c83",
  "message": "Product deleted successfully"
}
```

---

# 5️⃣ Scrape Product API (Enhanced with Full Details)

### ➤ Scrape a product from URL and store with complete details

```
POST /scrape/product
```

### 🔸 Request Body

```json
{
  "url": "https://www.worldofbooks.com/en-gb/products/atomic-habits-book-james-clear-9781847941831"
}
```

### ✅ Example Response

```json
{
  "id": "0574d763-416e-4bf2-90ac-149403868c83",
  "sourceId": "atomic-habits-book-james-clear-9781847941831",
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 14.09,
  "imageUrl": "https://www.worldofbooks.com/cdn/shop/files/1847941834.jpg",
  "sourceUrl": "https://www.worldofbooks.com/en-gb/products/atomic-habits-book-james-clear-9781847941831",
  "createdAt": "2026-01-10T12:05:48.726Z"
}
```

---

### 🧠 How it works (internal flow)

```
Client
  ↓
POST /scrape/product
  ↓
PlaywrightCrawler opens World of Books page
  ↓
Extracts:
  - Title
  - Author
  - Price
  - Product image
  - Source ID
  ↓
Prisma upsert (prevents duplicates)
  ↓
Saved in PostgreSQL
  ↓
Response returned to client
```

---

## 🔁 Duplicate Handling

- Products are uniquely identified using `sourceUrl`
- Uses **Prisma `upsert()`**
- Re-scraping same product **updates existing record**
- No duplicate rows are created

---

## ⚠️ Scraping Notes & Limitations

- Data is scraped **only from World of Books**
- Author and image are extracted when present in HTML
- If data is missing on the page, values may be `null`
- This behavior is intentional and documented to avoid fake data

---

## 🔐 Security & Safety

- No secrets committed to repository
- Environment variables used for DB connection
- CORS enabled for frontend communication
- No authentication required (as per assignment scope)

---

## 🧪 Testing the APIs

### Using curl

```bash
curl http://localhost:3000/products
```

```bash
curl -X POST http://localhost:3000/scrape/product \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.worldofbooks.com/en-gb/products/atomic-habits-book-james-clear-9781847941831"}'
```

---

## 🚀 Running Locally

1. Install dependencies

```bash
npm install
```

2. Setup environment variables

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

3. Run migrations

```bash
npx prisma migrate dev
```

4. Start server

```bash
npm run start:dev
```

---

## ✅ Assignment Scope Confirmation

- ✔ Real-time scraping implemented
- ✔ Database persistence
- ✔ RESTful APIs
- ✔ Pagination supported
- ✔ Clean, modular architecture
- ✔ Production-ready backend
