
import React from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/data/products";

const BlogList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">ThreadVibe Blog</h1>
        <p className="text-gray-600 mt-2">
          Fashion insights, styling tips, and the latest trends
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
