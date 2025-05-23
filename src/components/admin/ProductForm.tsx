
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

// Define the product data type from the database
type ProductData = {
  id?: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  stock: number;
  featured: boolean;
};

interface ProductFormProps {
  productId?: string;
  productData?: ProductData;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, productData, onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (productId) {
      // Fetch product details for editing
      supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to load product details");
          } else if (data) {
            setName(data.name);
            setDescription(data.description || "");
            setCategory(data.category || "");
            setPrice(data.price);
            setStock(data.stock);
            setFeatured(data.featured || false);
            
            // Fetch associated images for this product
            fetchProductImages(data.id);
          }
        });
    } else if (productData) {
      // Use the provided product data
      setName(productData.name);
      setDescription(productData.description || "");
      setCategory(productData.category || "");
      setPrice(productData.price);
      setStock(productData.stock);
      setFeatured(productData.featured || false);
      
      if (productData.id) {
        fetchProductImages(productData.id);
      }
    }
  }, [productId, productData]);
  
  const fetchProductImages = async (prodId: string) => {
    const { data: images, error } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", prodId)
      .order("is_primary", { ascending: false });
      
    if (error) {
      console.error("Error fetching product images:", error);
    } else if (images && images.length > 0) {
      setImageUrls(images.map(img => img.url));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate product data
      if (!name || price === "" || !category) {
        toast.error("Please fill in all required fields");
        setSubmitting(false);
        return;
      }

      // Parse price as a number
      const priceValue = typeof price === "string" ? parseFloat(price) : price;
      
      // Create or update product
      const productData = {
        name,
        description,
        category,
        price: priceValue,
        stock: typeof stock === "string" ? parseInt(stock) : stock,
        featured
      };

      let savedProductId = productId;
      let result;
      
      if (savedProductId) {
        // Update existing product
        result = await supabase
          .from("products")
          .update(productData)
          .eq("id", savedProductId);
        
        if (result.error) throw result.error;
      } else {
        // Create new product
        result = await supabase
          .from("products")
          .insert(productData)
          .select();
        
        if (result.error) throw result.error;
        
        if (result.data && result.data.length > 0) {
          savedProductId = result.data[0].id;
        }
      }
      
      // Handle image URLs if we have a valid productId
      if (savedProductId && imageUrls.length > 0) {
        // First delete existing images
        await supabase
          .from("product_images")
          .delete()
          .eq("product_id", savedProductId);
        
        // Then insert new ones
        const imagesToInsert = imageUrls.map((url, index) => ({
          product_id: savedProductId,
          url,
          is_primary: index === 0, // First image is primary
          alt_text: `${name} - image ${index + 1}`
        }));
        
        const { error: imageError } = await supabase
          .from("product_images")
          .insert(imagesToInsert);
          
        if (imageError) {
          console.error("Error saving product images:", imageError);
          toast.error("Product saved but failed to save images");
        }
      }

      toast.success(
        `Product ${savedProductId ? "updated" : "created"} successfully`
      );
      
      // Reset form or navigate
      if (!savedProductId) {
        // Reset form for new products
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setStock("");
        setFeatured(false);
        setImageUrls([]);
        setNewImageUrl("");
      }

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle string to number conversions for inputs
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? "" : parseFloat(value));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStock(value === "" ? "" : parseInt(value));
  };
  
  const handleAddImageUrl = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls([...imageUrls, newImageUrl]);
      setNewImageUrl("");
    }
  };
  
  const handleRemoveImageUrl = (urlToRemove: string) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          type="number"
          id="stock"
          value={stock}
          onChange={handleStockChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="featured">Featured</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(checked)}
          />
          <span className="text-sm text-gray-500">Display on homepage</span>
        </div>
      </div>
      
      {/* Product Images Section */}
      <div className="space-y-4">
        <h3 className="font-medium">Product Images</h3>
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="Enter image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <Button 
            type="button" 
            onClick={handleAddImageUrl}
            variant="outline"
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
        
        {/* Image URLs List */}
        {imageUrls.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {imageUrls.length === 1 ? "1 image" : `${imageUrls.length} images`} added
              {imageUrls.length > 0 && " (first image is primary)"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex flex-col space-y-1 border rounded-md p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">
                      {index === 0 ? "Primary Image" : `Image ${index + 1}`}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveImageUrl(url)}
                      className="h-6 w-6 p-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                  <div className="relative h-24 bg-gray-100 rounded">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="h-full w-full object-contain rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 truncate" title={url}>
                    {url.substring(0, 30)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : productId ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
