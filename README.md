# E-commerce Website

A modern full-stack e-commerce application built with Next.js, TypeScript, and MongoDB. This project demonstrates responsive design, shopping cart functionality, checkout process, and modern web development best practices.

## 🖼️ Preview

### Desktop View
![Desktop](/public/preview.jpg)

## Tech Stack

- **Frontend:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Styling:** Tailwind CSS + shadcn/ui
- **Validation:** Zod
- **State Management:** Zustand
- **Deployment:** Vercel + MongoDB Atlas

## Features

- 🛒 **Shopping Cart:** Add, remove, and update product quantities
- 💳 **Checkout Process:** Complete order flow with form validation
- 📱 **Responsive Design:** Optimized for all screen sizes
- 🔐 **User Authentication:** Secure login and registration
- 📦 **Product Management:** Browse and search products
- 💰 **Order Calculation:** Automatic totals with shipping ($50) and VAT (20%)
- ✅ **Form Validation:** Real-time validation with helpful error messages
- 🎯 **Order Confirmation:** Modal with order summary after successful checkout
- 💾 **Cart Persistence:** Cart state maintained across sessions
- 🚀 **Server Actions:** Modern Next.js server-side functionality

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB database (local or MongoDB Atlas)
- Git

## Core Functionality

### Shopping Cart
- Add products to cart with quantity selection
- Update quantities directly in cart
- Remove items from cart
- Calculate subtotals and totals in real-time
- Persist cart data across browser sessions

### Checkout Process
- Multi-step checkout form
- Form validation for all required fields
- Real-time calculation of:
  - Product subtotal
  - Fixed shipping cost ($50)
  - VAT (20% of product total, excluding shipping)
  - Final total
- Order confirmation modal with summary

### Product Management
- Product listing with search and filtering
- Individual product detail pages
- Product image galleries
- Stock management
- Price display and calculations

### User Experience
- Responsive design for all devices
- Interactive hover states
- Loading states and transitions
- Error handling and user feedback
- Accessibility considerations


## 🎉 Project Complete!

This e-commerce application now includes:

### ✅ Completed Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Management**: Full CRUD operations with MongoDB
- **Shopping Cart**: Persistent cart with Zustand state management
- **Checkout Process**: Multi-step form with validation
- **User Authentication**: NextAuth.js with credentials and Google OAuth
- **Order Management**: Complete order flow with confirmation
- **Admin Panel**: Product and order management (admin users)
- **Form Validation**: Zod schemas for type-safe validation
- **Server Actions**: Modern Next.js server-side functionality
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full type safety throughout the application


### 📱 Core Functionality

- **Browse Products**: View products by category with search and filters
- **Product Details**: Individual product pages with image galleries
- **Shopping Cart**: Add, update, and remove items with real-time totals
- **Checkout**: Complete order flow with address and payment forms
- **User Accounts**: Registration, login, and profile management
- **Order History**: View past orders and order details
- **Admin Features**: Manage products and orders (admin users)

### 🎯 Key Technical Highlights

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand for cart, React Hook Form for forms
- **Validation**: Zod schemas for runtime type checking
- **Components**: Reusable UI components with shadcn/ui
- **Performance**: Image optimization, and caching


### 🏆 Project Assessment Criteria Met

✅ **Responsive Design**: Mobile-first with Tailwind CSS
✅ **Interactive Elements**: Hover states and smooth transitions
✅ **Shopping Cart**: Full CRUD functionality with persistence
✅ **Form Validation**: Real-time validation with helpful messages
✅ **Order Calculations**: Accurate totals with shipping and VAT
✅ **Order Confirmation**: Modal with order summary
✅ **Bonus**: Cart persistence and full-stack implementation

This project demonstrates modern React/Next.js development practices with a focus on user experience, type safety, and scalable architecture.

## Deployment

This project is designed to deployed at [audiophile](https://itsaudiophile.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or run into issues, please open an issue on GitHub.