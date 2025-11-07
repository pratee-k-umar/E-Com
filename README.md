# E-Commerce Cart Application

Modern full-stack shopping cart with clean black & white theme, React frontend, and Node.js backend.

## 🖼️ Screenshots

![Product Grid](./media/e-com1.png) | ![Shopping Cart](./media/e-com2.png)
:---: | :---:
**Product Catalog** | **Cart Management**

![Checkout Process](./media/e-com3.png) | ![Order Confirmation](./media/e-com4.png)
:---: | :---:
**Checkout Process** | **Order Confirmation**

## ✨ Features

- **Product Catalog**: 20 real products from Fake Store API
- **Cart Management**: Add, remove, update quantities
- **Checkout Process**: Customer form with validation
- **Order History**: Track completed purchases
- **Responsive Design**: Mobile-first black & white theme

## �️ Tech Stack

**Frontend:** React 18, React Router, Axios, CSS Grid/Flexbox  
**Backend:** Node.js, Express, MongoDB (with in-memory fallback)  
**External API:** Fake Store API for product data

## 📁 Project Structure
```
E-Com/
├── backend/ (Express API)
├── frontend/ (React App)
├── media/ (screenshots)
└── package.json (dev scripts)
```

## 🚀 Quick Setup

```bash
# Install all dependencies
npm install

# Start both frontend & backend
npm run dev
```

**Access**: [http://localhost:3000](http://localhost:3000)

```bash
npm run start:backend  # Backend only (port 5000)
npm run start:frontend # Frontend only (port 3000)
```

## 🔧 Environment (Optional)
```bash
# backend/.env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```
*MongoDB is optional - app uses in-memory fallback*

## 📱 API Reference
```
GET    /api/cart           # Get cart
POST   /api/cart           # Add item
PUT    /api/cart/:id       # Update quantity
DELETE /api/cart/:id       # Remove item
POST   /api/checkout       # Process order
GET    /api/orders         # Order history
```

## 🎨 Theme
- **Colors**: Black text, white background, gray accents
- **Design**: Clean, minimal, responsive grid layout
- **Mobile-first**: Works on all screen sizes

## 📋 Notes
- Three-tier dependencies: root + backend + frontend
- Auto MongoDB fallback to in-memory storage
- Direct Fake Store API integration (no backend proxy)
- Hot reloading in development mode

## 📝 License
MIT License

---

*For detailed documentation, see `backend/README.md` and `frontend/README.md`*
      }
    ],
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com", 
      "phone": "123-456-7890",
      "address": "123 Main St"
    }
  }
  ```
- **GET** `/api/orders` - Get order history
- **GET** `/api/orders/:orderId` - Get specific order details

### External API Integration
- **Fake Store API**: `https://fakestoreapi.com/products` (called directly from frontend)

## 🎨 Design & UI

### Theme
- **Color Scheme**: Clean black and white minimalist design
- **Typography**: Modern, readable fonts with proper hierarchy
- **Layout**: Grid-based responsive layout
- **Interactions**: Smooth hover effects and transitions

### Responsive Design
- **Desktop**: 1200px+ (Grid layout with multiple columns)
- **Tablet**: 768px - 1199px (Adapted grid layout)  
- **Mobile**: 320px - 767px (Single column, touch-friendly)

## ✅ Features Implemented

### Core Requirements
- [x] **Product Catalog**: Integration with Fake Store API (20 products)
- [x] **Cart Management**: Add, remove, update quantities
- [x] **Checkout Process**: Customer information form with validation
- [x] **Order Processing**: Complete checkout with order confirmation  
- [x] **Responsive Design**: Mobile-first, cross-device compatibility

### Advanced Features
- [x] **Multi-page Navigation**: React Router implementation
- [x] **Order History**: Track and view completed purchases
- [x] **Database Persistence**: MongoDB with automatic fallback
- [x] **Error Handling**: Comprehensive error management
- [x] **Input Validation**: Both frontend and backend validation
- [x] **Loading States**: User feedback during operations
- [x] **Clean Architecture**: Modular, maintainable code structure

## 🧪 Testing the Application

### Manual Testing Flow
1. **Browse Products**: View product catalog on home page
2. **Add to Cart**: Click "Add to Cart" on any product  
3. **View Cart**: Navigate to cart page to see added items
4. **Update Quantities**: Use +/- buttons to modify quantities
5. **Remove Items**: Click "Remove" button to delete items
6. **Checkout**: Navigate to checkout and fill customer information
7. **Order Confirmation**: Complete order and view confirmation
8. **Order History**: Check order history page for completed orders

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Get cart contents
curl http://localhost:5001/api/cart

# Add item to cart
curl -X POST http://localhost:5001/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2,"name":"Test Product","price":29.99,"image":"test.jpg"}'

# Process checkout
curl -X POST http://localhost:5001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"cartItems":[...],"customerInfo":{...}}'
```

## 🗄️ Database

### MongoDB Integration
- **Connection**: Automatic connection to MongoDB if available
- **Fallback**: Seamless fallback to in-memory storage
- **Collections**: `cartitems` and `orderhistories`
- **Schema**: Mongoose schemas with validation

### Data Models
- **CartItem**: productId, name, price, quantity, image
- **OrderHistory**: orderId, items, customerInfo, total, timestamp

## 🌐 Browser Support

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🚀 Production Deployment

### Backend Deployment
- **Platform**: Heroku, Railway, AWS, or DigitalOcean
- **Database**: MongoDB Atlas for cloud database
- **Environment**: Production environment variables
- **CORS**: Configure for production frontend URL

### Frontend Deployment  
- **Platform**: Vercel, Netlify, or AWS S3 + CloudFront
- **Build**: `npm run build` for optimized production build
- **Environment**: Update API base URL for production

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=5001  
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecom
FRONTEND_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

This project demonstrates modern full-stack development practices. For development:

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`) 
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code structure and patterns
- Maintain the black and white theme consistency
- Add proper error handling and validation
- Write clear, documented code
- Test thoroughly across devices

## 📄 License

This project is created for educational and demonstration purposes.

---

## 🏆 Technical Highlights

- **Clean Architecture**: Separation of concerns with modular structure
- **External API Integration**: Direct frontend integration with Fake Store API
- **Responsive Design**: Mobile-first approach with black and white theme
- **Error Handling**: Comprehensive error management and user feedback
- **Database Flexibility**: MongoDB with automatic in-memory fallback
- **Modern React**: Functional components, hooks, and React Router
- **RESTful APIs**: Well-structured backend APIs with proper validation

**Developed with ❤️ using modern web technologies**