
import React, { useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const allColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Navy", hex: "#000080" },
    { name: "Gray", hex: "#808080" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply price range
    const minPrice = Math.min(...products.map(p => p.price));
    const maxPrice = Math.max(...products.map(p => p.price));
    const priceMin = minPrice + (priceRange[0] / 100) * (maxPrice - minPrice);
    const priceMax = minPrice + (priceRange[1] / 100) * (maxPrice - minPrice);
    
    filtered = filtered.filter(product => 
      product.price >= priceMin && product.price <= priceMax
    );
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color.name))
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setFilteredProducts(products);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <Slider 
          defaultValue={[0, 100]} 
          max={100} 
          step={1} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-6"
        />
        <div className="flex justify-between text-sm">
          <span>LKR {Math.min(...products.map(p => p.price)).toFixed(2)}</span>
          <span>LKR {Math.max(...products.map(p => p.price)).toFixed(2)}</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size}`} 
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              />
              <label 
                htmlFor={`size-${size}`}
                className="text-sm cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Color</h3>
        <div className="grid grid-cols-2 gap-2">
          {allColors.map(color => (
            <div key={color.name} className="flex items-center space-x-2">
              <Checkbox 
                id={`color-${color.name}`} 
                checked={selectedColors.includes(color.name)}
                onCheckedChange={() => handleColorToggle(color.name)}
              />
              <label 
                htmlFor={`color-${color.name}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                <span 
                  className="w-4 h-4 rounded-full border inline-block" 
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          className="flex-1 bg-brand-purple hover:bg-brand-purple/90"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar for Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-20">
            <h3 className="font-bold text-lg mb-6">Filters</h3>
            <FilterPanel />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden" variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <FilterPanel />
              </SheetContent>
            </Sheet>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full sm:w-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full sm:w-60"
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
            
            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results Info */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredProducts.length} results
          </p>
          
          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters or search query</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
