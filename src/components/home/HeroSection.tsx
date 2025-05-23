
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-light to-brand-teal-light z-0" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Express <span className="text-brand-purple">Your Vibe</span> in Every Thread
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-md">
              Premium quality t-shirts designed for comfort, style, and self-expression. Made for those who dare to be different.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-brand-purple hover:bg-brand-purple/90 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/products">Shop Collection</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-400 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://deal20one.com/wp-content/uploads/2024/02/1-light-grey.jpg"
              alt="ThreadVibe T-shirts"
              className="rounded-lg shadow-xl transform md:translate-y-4 md:translate-x-4 object-cover w-full h-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-medium text-brand-purple">New Summer Collection</p>
              <p className="text-sm text-gray-600">Discover the latest styles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
