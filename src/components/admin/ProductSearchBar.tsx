
import React from "react";
import { Input } from "@/components/ui/input";

interface ProductSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search products by name or category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default ProductSearchBar;
