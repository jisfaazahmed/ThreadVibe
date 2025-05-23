
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  const { getCartItemCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setSearchQuery("");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-purple">ThreadVibe</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-700 hover:text-brand-purple transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-40 lg:w-60 h-9 bg-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* User Account */}
            <Link to="/account">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
                {user && (
                  <span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full"></span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-purple text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-100"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="text-base font-medium py-2 hover:text-brand-purple transition"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/account"
                      className="text-base font-medium py-2 hover:text-brand-purple transition flex items-center gap-2"
                    >
                      <User className="h-4 w-4" /> 
                      Account
                      {user && (
                        <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                      )}
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
