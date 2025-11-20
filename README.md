# 🛍️ Ashly Store - E-Commerce Backend API

## المشروع

Backend API كامل لمتجر إلكتروني للملابس باستخدام Node.js, Express, و MongoDB.

**✨ المميزات الرئيسية:**

- ✅ **Anonymous Checkout** - الشراء بدون تسجيل أو login
- ✅ **Session-based Cart** - سلة تسوق بنظام الـ sessions
- ✅ **Fixed Sizes System** - مقاسات ثابتة (M, L, XL, XXL)
- ✅ **Stock Management** - إدارة المخزون التلقائية
- ✅ **Order Tracking** - تتبع الطلبات بالإيميل أو التليفون
- ✅ **Image Upload** - رفع صور المنتجات (حتى 10 صور)

---

## 🚀 Quick Start

### المتطلبات

- Node.js (v14+)
- MongoDB Atlas account
- npm

### التثبيت

```bash
# 1. Clone the project
git clone <repository-url>
cd Ashly

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env and add your MongoDB connection string

# 4. Start development server
npm run dev

# Or production
npm start
```

الـ server هيشتغل على: **http://localhost:5000**

---

## 📁 Project Structure

```
Ashly/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── cartController.js    # Cart operations (anonymous)
│   │   ├── orderController.js   # Order operations
│   │   └── productController.js # Product CRUD
│   ├── models/
│   │   ├── Cart.js              # Cart schema (sessionId-based)
│   │   ├── Order.js             # Order schema (flat structure)
│   │   └── Product.js           # Product schema (fixed sizes)
│   ├── routes/
│   │   ├── cartRoutes.js        # Cart endpoints
│   │   ├── orderRoutes.js       # Order endpoints
│   │   └── productRoutes.js     # Product endpoints
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── upload.js            # Multer image upload
│   │   └── validation.js        # Input validation
│   ├── utils/
│   │   ├── ApiResponse.js       # Response formatting
│   │   └── constants.js         # App constants
│   └── server.js                # Express app entry
├── uploads/                     # Uploaded images
├── .env                         # Environment variables
├── package.json
├── README.md                    # This file
├── ANONYMOUS_FLOW.md            # Complete flow guide
├── API_EXAMPLES.md              # All API examples
└── test-anonymous-flow.http     # API test file
```

---

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ashly-store
NODE_ENV=development
```

---

## 🛒 Anonymous Checkout Flow

### الفكرة الأساسية

**لا يوجد تسجيل مستخدمين!** أي شخص يقدر يضيف منتجات ويشتري مباشرة.

### الخطوات:

1. **إنشاء Cart** → احصل على `sessionId`

   ```http
   POST /api/cart
   ```

2. **إضافة منتجات** → استخدم الـ `sessionId`

   ```http
   POST /api/cart/{sessionId}/items
   ```

3. **Checkout** → أدخل بيانات العميل مباشرة
   ```http
   POST /api/orders
   Body: {
     sessionId,
     firstName, lastName,
     email, phone,
     streetAddress, city, state
   }
   ```

**📖 التفاصيل الكاملة:** اقرأ ملف [ANONYMOUS_FLOW.md](ANONYMOUS_FLOW.md)

---

## 📦 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product
- `PATCH /api/products/:id/stock` - Update size stock
- `DELETE /api/products/:id` - Delete product

### Cart (Anonymous)

- `POST /api/cart` - Create new cart → get sessionId
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/items` - Add item
- `PUT /api/cart/:sessionId/items/:itemId` - Update quantity
- `DELETE /api/cart/:sessionId/items/:itemId` - Remove item
- `DELETE /api/cart/:sessionId` - Clear cart

### Orders

- `POST /api/orders` - Create order (Checkout)
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/search?email=...` - Search by email
- `GET /api/orders/search?phone=...` - Search by phone
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update status (Admin)
- `PATCH /api/orders/:id/cancel` - Cancel order

**📖 أمثلة كاملة:** اقرأ ملف [API_EXAMPLES.md](API_EXAMPLES.md)

---

## 🎨 Product Schema

```javascript
{
  name: String,              // "Sweatshirt أسود"
  description: String,
  price: Number,             // 500
  category: String,          // "sweatshirt" | "pants"
  colors: [String],          // ["أسود", "أبيض"]
  sizes: [
    {
      name: String,          // "M" | "L" | "XL" | "XXL"
      quantity: Number       // Stock quantity
    }
  ],
  images: [String],          // Image URLs
  totalQuantity: Number,     // Auto-calculated
  isAvailable: Boolean
}
```

### Fixed Sizes

المقاسات ثابتة: **M, L, XL, XXL** فقط

---

## 🛒 Cart Schema (Anonymous)

```javascript
{
  sessionId: String,         // Unique session ID (hex)
  items: [
    {
      product: ObjectId,
      size: String,
      color: String,
      quantity: Number,
      price: Number
    }
  ],
  totalItems: Number,        // Auto-calculated
  totalPrice: Number,        // Auto-calculated
  isActive: Boolean          // false بعد الـ checkout
}
```

---

## 📋 Order Schema

```javascript
{
  orderNumber: String,       // Auto-generated: "ORD-241119-0001"

  // Customer Info (Direct - no user reference)
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  streetAddress: String,
  city: String,
  state: String,

  // Order Items
  items: [...],
  totalItems: Number,
  totalPrice: Number,
  shippingFee: Number,
  finalPrice: Number,        // Auto-calculated

  // Status & Tracking
  status: String,            // pending, confirmed, processing,
                            // shipped, delivered, cancelled
  notes: String,

  // Timestamps
  createdAt: Date,
  confirmedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
}
```

---

## 🧪 Testing

### Using VS Code REST Client

1. Install **REST Client** extension
2. Open `test-anonymous-flow.http`
3. Click **Send Request** on any endpoint

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Create cart
curl -X POST http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart/{sessionId}/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "...",
    "size": "L",
    "color": "أسود",
    "quantity": 2
  }'
```

---

## 📊 Features

### ✅ Stock Management

- تحديث تلقائي للمخزون بعد كل طلب
- منع البيع فوق الكمية المتاحة
- إرجاع الكمية عند إلغاء الطلب

### ✅ Order Tracking

- البحث بالإيميل أو التليفون
- تتبع حالة الطلب
- Order number تلقائي

### ✅ Image Upload

- حتى 10 صور لكل منتج
- حد أقصى 5MB لكل صورة
- صيغ مدعومة: jpg, jpeg, png, gif, webp

### ✅ Size Updates

```http
# Update only one size
PATCH /api/products/:id/stock
{
  "sizeName": "L",
  "quantity": 25
}

# Update multiple sizes
PUT /api/products/:id
{
  "sizes": {
    "L": 20,
    "XL": 12
  }
}
```

---

## 🔒 Security Notes

- Input validation على كل الـ endpoints
- File upload مع size و type restrictions
- MongoDB injection protection
- CORS enabled

---

## 📚 Documentation Files

- **README.md** (هذا الملف) - نظرة عامة
- **ANONYMOUS_FLOW.md** - شرح تفصيلي لـ Anonymous Checkout
- **API_EXAMPLES.md** - جميع الـ API examples
- **test-anonymous-flow.http** - ملف اختبار الـ API

---

## 🐛 Common Issues

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution:** تأكد من الـ MongoDB URI في ملف `.env`

### Upload Error

```
Error: File too large
```

**Solution:** حجم الصورة أكبر من 5MB

### Cart Not Found

```
Error: Cart not found
```

**Solution:** أنشئ cart جديدة أولاً بـ `POST /api/cart`

---

## 🛠️ Technologies

- **Node.js** - Runtime
- **Express** v5.1.0 - Web framework
- **MongoDB** - Database
- **Mongoose** v8.20.0 - ODM
- **Multer** v2.0.2 - File uploads
- **Nodemon** v3.1.11 - Development

---

## 👨‍💻 Development

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Check for errors
npm run lint  # (if configured)
```

---

## 📞 Support

للأسئلة أو المشاكل، افتح issue في الـ repository.

---

**🎉 Made with ❤️ for Ashly Store**
# Ashri
