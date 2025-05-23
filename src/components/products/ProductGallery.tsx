
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState<boolean[]>([]);

  // Make sure we have an array of valid image URLs and handle potential Supabase Storage paths
  const safeImages = images && images.length > 0 
    ? images.map((img, index) => {
        // Skip processing if we already know this image has an error
        if (imageLoadErrors[index]) {
          return "https://placehold.co/600x600/CCCCCC/333333?text=Image+Error";
        }
        
        // Check if the image URL is a Supabase Storage path without protocol/domain
        if (img && typeof img === 'string') {
          if (!img.startsWith('http')) {
            // For Supabase Storage URLs that might be missing protocol/domain
            // We use the project ID from the Supabase client
            return `https://slqmtywrcktxkiqqldnu.supabase.co/storage/v1/object/public/${img}`;
          }
          return img;
        }
        
        return "https://placehold.co/600x600/CCCCCC/333333?text=No+Image";
      })
    : ["https://placehold.co/600x600/CCCCCC/333333?text=No+Image"];

  const handleImageError = (index: number) => {
    console.error(`Image at index ${index} failed to load:`, safeImages[index]);
    setImageLoadErrors(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg border">
        <img
          src={safeImages[selectedImage]}
          alt={`${name} - View ${selectedImage + 1}`}
          className="object-cover w-full h-full"
          onError={() => handleImageError(selectedImage)}
        />
      </div>
      
      {safeImages.length > 1 && (
        <div className="pt-2">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {safeImages.map((image, index) => (
                <CarouselItem key={index} className="basis-1/4 pl-2">
                  <div 
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index ? "border-brand-purple" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${name} thumbnail ${index + 1}`} 
                      className="object-cover w-full h-full hover:opacity-75 transition"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
