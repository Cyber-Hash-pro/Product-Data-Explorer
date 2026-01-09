Perfect 👍
Main **isi project (Product Data Explorer – NestJS + Scraping)** ke hisaab se
tumhari **Project Conventions file ko UPDATE karke FINAL version** de raha hoon.

Isko tum **`PROJECT_CONVENTIONS.md`** ya `README.md` ke andar rakh sakte ho.

---

# 📘 Project Conventions

**Product Data Explorer (NestJS + TypeScript Backend)**

Yeh document batata hai ki is project mein **naming conventions, coding standards, aur best practices** kya follow kiye gaye hain.
Project ka focus hai: **clean backend, scraping reliability, aur production-readiness**.

---

## 1️⃣ File & Directory Naming

### 📂 File Names — `kebab-case`

NestJS ecosystem ke standard ke according.

✅ Examples:

* `product.controller.ts`
* `product.service.ts`
* `scrape.processor.ts`
* `database.config.ts`
* `view-history.service.ts`

❌ Avoid:

* `ProductController.ts`
* `scrapeProcessor.ts`
* `DBConfig.ts`

---

### 📁 Directory Names — `kebab-case`

✅ Examples:

* `product/`
* `scrape/`
* `view-history/`
* `queue/`
* `config/`

❌ Avoid:

* `Products/`
* `viewHistory/`
* `QueueWorkers/`

---

### 🧪 Special Files

* Test files: `*.spec.ts`
* DTO files: `*.dto.ts`
* Prisma files: `schema.prisma`
* Config files: `*.config.ts`

---

## 2️⃣ TypeScript / NestJS Coding Conventions

### 🔹 Variables & Functions — `camelCase`

✅ Examples:

```ts
const productId = 'abc';
const isScrapeRequired = true;

function fetchProductDetails() {}
```

❌ Avoid:

```ts
const Product_ID;
function Fetch_product() {}
```

---

### 🔹 Classes & Types — `PascalCase`

✅ Examples:

* `ProductService`
* `ScrapeJobStatus`
* `CreateProductDto`

---

### 🔹 Private Properties / Methods

Prefix with `_`

```ts
private _buildSourceUrl() {}
```

---

### 🔹 Constants — `MACRO_CASE`

Used for:

* Limits
* Timeouts
* Defaults

```ts
const SCRAPE_TTL_HOURS = 24;
const MAX_SCRAPE_RETRIES = 3;
```

---

### 🔹 Environment Variables — `MACRO_CASE`

Defined in `.env`

```env
DATABASE_URL=
REDIS_HOST=
SCRAPER_DELAY_MS=
```

Never hardcode secrets ❌

---

## 3️⃣ Enums Convention (IMPORTANT)

### Enum Names — `PascalCase`

```ts
export enum ScrapeJobStatus {
  pending = 'pending',
  running = 'running',
  completed = 'completed',
  failed = 'failed',
}
```

✅ **Reason**:
JSON / DB friendly + clean API responses

❌ Avoid:

```ts
PENDING,
RUNNING
```

---

## 4️⃣ Database Conventions (PostgreSQL + Prisma)

### 🗄️ Table Names — `snake_case` (plural)

✅ Examples:

* `products`
* `product_details`
* `scrape_jobs`
* `view_history`

---

### 🧾 Column Names — `snake_case`

DB:

```sql
source_id
created_at
last_scraped_at
```

TypeScript:

```ts
sourceId
createdAt
lastScrapedAt
```

👉 Prisma handles mapping automatically.

---

### 🔐 Keys & Indexes

* `source_id` → **unique**
* `source_url` → **unique**
* `last_scraped_at` → indexed

---

## 5️⃣ API Route Conventions

### 🌐 REST Endpoints — `kebab-case`

✅ Examples:

* `/api/navigation`
* `/api/categories/:slug`
* `/api/products`
* `/api/products/:id`
* `/api/scrape/product`

❌ Avoid:

* `/getProducts`
* `/ProductDetails`
* `/scrapeProductNow`

---

## 6️⃣ Scraping-Specific Conventions

### 🕷️ Scraper Files

* All scraping logic lives inside:

```
src/scrape/
```

### Rules:

* ❌ No scraping in controllers
* ✅ Controllers → trigger jobs
* ✅ Workers → do scraping
* ✅ Services → save to DB

---

### 🧠 Scrape Naming

```ts
scrapeCategoryPage()
scrapeProductList()
scrapeProductDetail()
```

---

## 7️⃣ Queue & Background Jobs

* Queue processors in `queue/`
* File naming:

  * `scrape.processor.ts`
* Job names:

  * `scrape-category`
  * `scrape-product`

---

## 8️⃣ Error Handling & Logging

* Use NestJS exceptions:

```ts
throw new BadRequestException('Invalid category');
```

* Log meaningful messages:

```ts
this.logger.log('Scraping started for product');
```

---

## 9️⃣ General Best Practices

* ✅ One feature = one module
* ✅ Thin controllers, fat services
* ✅ No business logic in controllers
* ✅ Avoid magic numbers
* ✅ Explicit return types
* ✅ Clean README explanations

---

## 🔟 Golden Rules (Reviewer-Friendly)

* **Consistency > cleverness**
* **Working code > fancy abstraction**
* **Readable code > compact code**
* **Honest implementation > fake completeness**


