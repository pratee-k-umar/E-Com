# Backend Architecture Documentation

## Project Structure

```
backend/
├── config/
│   ├── config.js          # Environment configuration and app settings
│   └── database.js        # Database connection and service management
├── controllers/
│   ├── productController.js    # Product-related business logic
│   ├── cartController.js       # Cart management logic
│   └── checkoutController.js   # Checkout and health check logic
├── data/
│   └── mockProducts.js     # Mock product data
├── middleware/
│   ├── cors.js            # CORS configuration
│   ├── errorHandler.js    # Global error handling
│   ├── logger.js          # Request logging
│   └── validation.js      # Request validation middleware
├── models/
│   ├── index.js           # Model exports
│   ├── Product.js         # Product schema/model
│   └── CartItem.js        # Cart item schema/model
├── routes/
│   ├── index.js           # Main route aggregator
│   ├── productRoutes.js   # Product endpoint routes
│   ├── cartRoutes.js      # Cart endpoint routes
│   └── checkoutRoutes.js  # Checkout endpoint routes
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── server.js              # Main application entry point
```

## Architecture Patterns

### MVC (Model-View-Controller) Pattern
- **Models**: Database schemas and data structures (`models/`)
- **Controllers**: Business logic and request handling (`controllers/`)
- **Routes**: URL routing and middleware composition (`routes/`)

### Service Layer Pattern
- **DatabaseService**: Centralized database management (`config/database.js`)
- **Configuration Service**: Environment and app configuration (`config/config.js`)

### Middleware Pattern
- Modular middleware for cross-cutting concerns
- Request validation, error handling, logging, CORS

## Core Components

### 1. Models (`models/`)

#### Product.js
```javascript
// Mongoose schema for products
- id: String (unique identifier)
- name: String (product name)
- price: Number (product price)
- image: String (product image URL)
```

#### CartItem.js
```javascript
// Mongoose schema for cart items
- productId: String (reference to product)
- name: String (product name)
- price: Number (product price)
- quantity: Number (item quantity)
- image: String (product image URL)
```

### 2. Controllers (`controllers/`)

#### ProductController
- `getAllProducts()`: Fetch all products from database or memory

#### CartController
- `getCart()`: Retrieve cart items with total
- `addToCart()`: Add items to cart with quantity
- `removeFromCart()`: Remove items from cart
- `updateCartItem()`: Update item quantities

#### CheckoutController
- `processCheckout()`: Handle checkout process and receipt generation
- `getHealthCheck()`: Server health status endpoint

### 3. Routes (`routes/`)

#### API Endpoints Structure
```
/api/
├── /products           # Product endpoints
│   └── GET /          # Get all products
├── /cart              # Cart endpoints
│   ├── GET /          # Get cart contents
│   ├── POST /         # Add to cart
│   ├── PUT /:id       # Update cart item
│   └── DELETE /:id    # Remove from cart
├── /checkout          # Checkout endpoints
│   └── POST /         # Process checkout
└── /health           # Health check
```

### 4. Middleware (`middleware/`)

#### CORS (`cors.js`)
- Configurable cross-origin resource sharing
- Development and production settings

#### Error Handler (`errorHandler.js`)
- Global error handling
- Mongoose validation error handling
- 404 route handling
- Development vs production error responses

#### Logger (`logger.js`)
- Request logging with timestamps
- IP address tracking
- Request body logging (excluding sensitive data)

#### Validation (`validation.js`)
- Cart item validation (productId, quantity)
- Checkout validation (customer info, cart items)
- Input sanitization

### 5. Configuration (`config/`)

#### Database Service (`database.js`)
- MongoDB connection management
- Automatic fallback to in-memory storage
- Product initialization
- Database state management

#### App Configuration (`config.js`)
- Environment variable management
- Default settings
- Database and application settings

## Data Flow

### Request Flow
1. **Request** → Express Server
2. **Middleware** → CORS, Logging, Body Parsing
3. **Routes** → URL routing and validation middleware
4. **Controllers** → Business logic execution
5. **Models/Database** → Data persistence layer
6. **Response** → JSON response with error handling

### Error Flow
1. **Error Occurrence** → Controller or Database
2. **Error Propagation** → Next() middleware chain
3. **Error Handler** → Global error processing
4. **Response** → Formatted error response

## Database Strategy

### Dual Storage Support
- **Primary**: MongoDB with Mongoose ODM
- **Fallback**: In-memory storage for development

### Connection Management
- Automatic connection retry
- Graceful fallback handling
- Connection state monitoring

## Security Features

### Input Validation
- Request body validation
- Type checking
- Required field validation
- SQL injection prevention

### Error Handling
- Sensitive information filtering
- Stack trace control (development only)
- Consistent error responses

## Development Features

### Logging
- Request/response logging
- Error tracking
- Performance monitoring
- IP address tracking

### Hot Reloading
- Nodemon integration
- Automatic server restart
- Development environment detection

## API Documentation

### Products API
```http
GET /api/products
Response: Array of product objects
```

### Cart API
```http
GET /api/cart
Response: { items: Array, total: Number }

POST /api/cart
Body: { productId: String, quantity?: Number }
Response: Cart item object

PUT /api/cart/:productId
Body: { quantity: Number }
Response: Updated cart item

DELETE /api/cart/:productId
Response: Success message
```

### Checkout API
```http
POST /api/checkout
Body: { 
  cartItems: Array, 
  customerInfo: { name, email, phone?, address? }
}
Response: Receipt object with order details
```

### Health Check
```http
GET /api/health
Response: { status, timestamp, database }
```

## Environment Configuration

### Required Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `CLIENT_URL`: Frontend URL for CORS (default: http://localhost:3000)
- `NODE_ENV`: Environment mode (development/production)

### Optional Variables
- Database connection settings
- Application limits and timeouts

## Benefits of Modular Architecture

### Maintainability
- Separation of concerns
- Single responsibility principle
- Easy to locate and modify code

### Scalability
- Modular components can be scaled independently
- Easy to add new features
- Database abstraction allows storage flexibility

### Testability
- Isolated components
- Dependency injection
- Mockable services

### Reusability
- Shared middleware across routes
- Reusable validation logic
- Configurable components

### Development Experience
- Clear project structure
- Consistent patterns
- Easy onboarding for new developers