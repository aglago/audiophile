# E-commerce Website

A modern full-stack e-commerce application built with Next.js, TypeScript, and MongoDB. This project demonstrates responsive design, shopping cart functionality, checkout process, and modern web development best practices.

## 🖼️ Preview

### Desktop View
![Desktop](/public/preview.jpg)

## Tech Stack

- **Frontend:** Next.js 15+ with App Router
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

## Support

If you have any questions or run into issues, please open an issue on GitHub.
