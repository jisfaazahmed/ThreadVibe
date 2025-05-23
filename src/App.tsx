
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';

import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFound from './pages/NotFound';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AdminOrderDetailPage from './pages/AdminOrderDetailPage';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
