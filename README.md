# E-commerce Website

A modern full-stack e-commerce application built with Next.js, TypeScript, and MongoDB. This project demonstrates responsive design, shopping cart functionality, checkout process, and modern web development best practices.

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

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── products/          # Product pages
│   │   ├── [id]/         # Individual product page
│   │   └── page.tsx      # Products listing
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout process
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # shadcn/ui components
│   ├── cart/             # Cart-related components
│   ├── product/          # Product components
│   ├── checkout/         # Checkout components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication config
│   ├── cart.ts           # Cart utilities
│   ├── validation.ts     # Zod schemas
│   └── utils.ts          # Helper functions
├── models/               # Mongoose schemas
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   └── Order.ts          # Order model
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   └── products/         # Product images
└── data/                 # Sample data
    └── products.json     # Product data
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

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

## API Documentation

[Add your API endpoints documentation here]

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com/) with [MongoDB Atlas](https://www.mongodb.com/atlas).

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or run into issues, please open an issue on GitHub.