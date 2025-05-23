
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  author,
  imageUrl,
}) => {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/blog/${id}`}>
      <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover product-card-transition hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="text-sm text-gray-500 mb-2">
            {formattedDate} • By {author}
          </div>
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-600 line-clamp-3">{excerpt}</p>
          <div className="mt-4 text-brand-purple font-medium">Read More</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
