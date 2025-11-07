# E-Commerce Frontend

React application with black & white theme and responsive design.

## 🚀 Quick Start

```bash
# From frontend directory
npm install
npm start

# Or from root directory
npm run start:frontend
```

**Runs on**: [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
src/
├── pages/ (Home, Cart, Checkout, Orders)
├── components/ (ProductGrid, Navigation, etc.)
├── services/ (API calls)
└── App.js (routing & main component)
```

## 📱 Key Features

### Pages
- **Home** (`/`) - Product catalog with Fake Store API
- **Cart** (`/cart`) - Cart management with quantity updates
- **Checkout** (`/checkout`) - Customer form with validation  
- **Orders** (`/orders`) - Order history tracking

### Components
- **ProductGrid** - Responsive product display
- **Navigation** - Header with cart count
- **CheckoutForm** - Customer info validation

## 🛠️ Tech Stack

- **React 18** - Modern hooks & components
- **React Router v6** - Client-side routing
- **Axios** - HTTP requests  
- **CSS Grid/Flexbox** - Responsive layouts
- **Fake Store API** - External product data

## 🔧 Configuration

Optional `.env` for custom API endpoints:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_FAKE_STORE_API=https://fakestoreapi.com
```

---

*Part of the E-Commerce Cart Application*

**Key Functions:**
```javascript
const updateCartItem = async (productId, newQuantity) => {
  await cartService.update(productId, newQuantity);
  await fetchCart(); // Refresh cart data
};
```

### Checkout Page (`/checkout`)
**Features:**
- Customer information form
- Form validation (client-side)
- Order summary display
- Checkout processing
- Order confirmation

**Form Validation:**
```javascript
const validateForm = () => {
  if (!customerInfo.name.trim() || !customerInfo.email.trim()) {
    setError('Name and email are required');
    return false;
  }
  if (!customerInfo.email.includes('@')) {
    setError('Please enter a valid email address');
    return false;
  }
  return true;
};
```

### Order History Page (`/orders`)
**Features:**
- View completed orders
- Order details display
- Order status tracking
- Date/time information

## 🔌 API Integration

### Service Layer Architecture
```javascript
// api.js - Centralized API management
const API_BASE_URL = 'http://localhost:5001/api';
const FAKE_STORE_API = 'https://fakestoreapi.com';

// Product service (external API)
export const productService = {
  getAll: () => axios.get(`${FAKE_STORE_API}/products`)
};

// Backend services
export const cartService = {
  get: () => backendAPI.get('/cart'),
  add: (productId, quantity, productData) => backendAPI.post('/cart', {...}),
  update: (productId, quantity) => backendAPI.put(`/cart/${productId}`, {quantity}),
  remove: (productId) => backendAPI.delete(`/cart/${productId}`)
};

export const checkoutService = {
  process: (cartItems, customerInfo) => backendAPI.post('/checkout', {...})
};
```

### External API Integration
**Fake Store API:**
- Direct frontend calls to `https://fakestoreapi.com/products`
- Real product data with images, names, prices
- No backend proxy - clean architecture separation

### Error Handling
```javascript
const handleApiError = (error) => {
  if (error.response?.status === 404) {
    setError('Item not found');
  } else if (error.response?.status >= 500) {
    setError('Server error. Please try again later.');
  } else {
    setError('An unexpected error occurred');
  }
};
```

## 🎯 State Management

### React Hooks Implementation
```javascript
// App.js - Global state management
const [cart, setCart] = useState({ items: [], total: 0 });
const [receipt, setReceipt] = useState(null);
const [error, setError] = useState('');

// Fetch cart data
const fetchCart = async () => {
  try {
    const response = await cartService.get();
    setCart(response.data);
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

// Add to cart with product data
const addToCart = async (productId, quantity = 1, productData) => {
  try {
    await cartService.add(productId, quantity, productData);
    await fetchCart();
    setError('');
  } catch (error) {
    setError('Failed to add item to cart');
    throw error;
  }
};
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */

/* Mobile: 320px - 767px */
.product-grid {
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 768px - 1199px */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

### Black and White Theme Implementation
```css
/* Global Theme Variables */
:root {
  --primary-bg: #ffffff;
  --primary-text: #000000;
  --border-color: #000000;
  --hover-bg: #000000;
  --hover-text: #ffffff;
}

/* Component Examples */
.product-card {
  background-color: var(--primary-bg);
  color: var(--primary-text);
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-4px);
}

.btn-primary {
  background-color: var(--primary-text);
  color: var(--primary-bg);
  border: 2px solid var(--border-color);
}

.btn-primary:hover {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product catalog loads correctly
- [ ] Add to cart functionality works
- [ ] Cart page displays items correctly
- [ ] Quantity updates work in real-time
- [ ] Item removal works properly
- [ ] Checkout form validation works
- [ ] Order processing completes successfully
- [ ] Order history displays correctly
- [ ] Responsive design works on all devices
- [ ] Error states display appropriately

### Browser Testing
- **Chrome** (Primary development browser)
- **Firefox** (Cross-browser compatibility)
- **Safari** (iOS/macOS compatibility)
- **Edge** (Windows compatibility)

## 🚀 Production Build

### Build Process
```bash
# Create optimized production build
npm run build

# Serve locally for testing
npx serve -s build
```

### Performance Optimizations
- **Code Splitting**: React.lazy for route-based splitting
- **Image Optimization**: Proper image sizing and loading
- **CSS Optimization**: Minified and optimized stylesheets
- **Bundle Analysis**: Webpack bundle analyzer integration

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build and deploy
npm run build
# Drag build folder to Netlify dashboard
```

#### AWS S3 + CloudFront
```bash
# Build project
npm run build

# Upload to S3 bucket
aws s3 sync build/ s3://your-bucket-name

# Configure CloudFront distribution
```

## 📝 Development Guidelines

### Component Development
- Use functional components with hooks
- Implement proper error boundaries
- Follow single responsibility principle
- Maintain consistent naming conventions

### Styling Guidelines
- Follow black and white theme strictly
- Use CSS custom properties for theming
- Implement mobile-first responsive design
- Maintain consistent spacing and typography

### API Integration
- Use centralized service layer
- Implement proper error handling
- Add loading states for all API calls
- Cache data appropriately

---

**Part of the E-Commerce Cart Application**  
*Modern React frontend with black and white theme*