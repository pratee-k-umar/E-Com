# E-Commerce Backend API

Express.js API server with MongoDB for cart management and order processing.

## 🚀 Quick Start

```bash
# From backend directory
npm install
npm start

# Or from root directory  
npm run start:backend
```

**Server runs on**: [http://localhost:5000](http://localhost:5000)

## 📁 Structure

```
backend/
├── controllers/ (business logic)
├── models/ (MongoDB schemas)  
├── routes/ (API endpoints)
├── config/ (database)
└── server.js (entry point)
```

## � API Endpoints

### Cart Operations
```
GET    /api/cart           # Get cart items & total
POST   /api/cart           # Add item to cart  
PUT    /api/cart/:id       # Update quantity
DELETE /api/cart/:id       # Remove item
```

### Checkout & Orders
```
POST   /api/checkout       # Process checkout
GET    /api/orders         # Get order history
GET    /api/orders/:id     # Get specific order
```

## 🔧 Environment

Optional `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

## 🗄️ Database

- **Primary**: MongoDB with Mongoose ODM
- **Fallback**: In-memory storage (auto-enabled if MongoDB unavailable)
- **Models**: CartItem, OrderHistory with validation

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database & ODM
- **UUID** - Unique order IDs
- **CORS** - Cross-origin requests
- **Validation** - Input sanitization

---

*Part of the E-Commerce Cart Application*
```

### Order History

#### Get Order History
```http
GET /api/orders
```

#### Get Specific Order
```http
GET /api/orders/:orderId
```

## 🗄️ Database Layer

### MongoDB Integration
- **Primary**: MongoDB with Mongoose ODM
- **Fallback**: In-memory storage if MongoDB unavailable
- **Auto-detection**: Seamless switching between storage types

### Data Models

#### CartItem Schema
```javascript
{
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

#### OrderHistory Schema
```javascript
{
  orderId: { type: String, required: true, unique: true },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String }
  },
  items: [{
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'confirmed' },
  orderDate: { type: Date, default: Date.now }
}
```

## 🛡️ Middleware & Validation

### Input Validation
- **Cart Items**: Product ID and quantity validation
- **Cart Updates**: Quantity-only validation for updates
- **Checkout**: Comprehensive customer info and cart validation

### Error Handling
- Comprehensive error catching and logging
- User-friendly error messages
- HTTP status code compliance

### CORS Configuration
```javascript
// Configured for frontend origin
cors({
  origin: 'http://localhost:3000',
  credentials: true
})
```

## 🔧 Key Features

### Cart Management
- **Persistence**: MongoDB with in-memory fallback
- **Validation**: Input sanitization and validation
- **Real-time Updates**: Immediate quantity and total calculations
- **Error Handling**: Graceful error management

### Checkout Processing
- **Order Generation**: UUID-based order ID generation
- **Data Validation**: Customer information validation
- **Cart Clearing**: Automatic cart clearing after successful checkout
- **Order Storage**: Complete order history tracking

### Database Flexibility
```javascript
class DatabaseService {
  // Automatic MongoDB detection
  async connect() {
    try {
      await mongoose.connect(MONGODB_URI);
      this.usingMongoDB = true;
    } catch (error) {
      // Fallback to in-memory storage
      this.usingMongoDB = false;
    }
  }
}
```

## 🧪 Testing

### Manual API Testing
```bash
# Test cart endpoint
curl -X GET http://localhost:5001/api/cart

# Add item to cart
curl -X POST http://localhost:5001/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "1",
    "quantity": 2,
    "name": "Test Product",
    "price": 29.99,
    "image": "test.jpg"
  }'

# Update cart item
curl -X PUT http://localhost:5001/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'

# Process checkout
curl -X POST http://localhost:5001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [...],
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St"
    }
  }'
```

## 🚀 Production Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecom
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Checklist
- [ ] Configure production MongoDB URI
- [ ] Update CORS origin for production frontend
- [ ] Set up environment variables
- [ ] Configure logging and monitoring
- [ ] Set up health check endpoints

### Recommended Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with automatic deployments
- **AWS**: Full control with EC2 + MongoDB Atlas
- **DigitalOcean**: Simple VPS deployment

## 📝 Development Notes

### Code Structure
- **Controllers**: Handle business logic and response formatting
- **Models**: Define data schemas and database interactions
- **Routes**: Define API endpoints and middleware application
- **Middleware**: Handle validation, authentication, and error processing

### Best Practices Implemented
- **Separation of Concerns**: Clear layer separation
- **Error Handling**: Comprehensive try-catch blocks
- **Input Validation**: All inputs validated and sanitized
- **Database Abstraction**: Service layer for database operations
- **Environment Configuration**: Flexible environment management

---

**Part of the E-Commerce Cart Application**  
*Modern Node.js/Express backend with MongoDB integration*