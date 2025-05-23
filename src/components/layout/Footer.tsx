
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = new FormData(target).get("email") as string;
    toast("Thanks for subscribing!");
    target.reset();
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">ThreadVibe</h2>
            <p className="text-gray-400 text-sm">
              High-quality, ethically made t-shirts for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-brand-purple transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-brand-purple transition">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-brand-purple transition">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@threadvibe.com" className="hover:text-brand-purple transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-gray-400 hover:text-white transition">New Arrivals</Link>
              </li>
              <li>
                <Link to="/products?category=bestsellers" className="text-gray-400 hover:text-white transition">Best Sellers</Link>
              </li>
              <li>
                <Link to="/products?onSale=true" className="text-gray-400 hover:text-white transition">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white transition">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700"
                required
              />
              <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ThreadVibe. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 text-sm hover:text-white transition">
                Terms of Service
              </Link>
              <Link to="/shipping-info" className="text-gray-500 text-sm hover:text-white transition">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
