
import React from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/products";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // In a real application, we would fetch the full blog post content
  // For now, let's generate some placeholder content
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta dui non dolor tincidunt scelerisque. Integer vel magna vitae urna vestibulum vehicula.",
    "Sed augue lorem, tincidunt ut feugiat nec, ullamcorper nec mauris. Curabitur dictum libero eget malesuada porta. Nam eu risus scelerisque, venenatis diam vitae, facilisis tortor.",
    "Fusce facilisis, mi nec scelerisque faucibus, nunc est sagittis nibh, non pulvinar orci nisl et magna. Quisque id congue sapien. In non ultrices diam. Donec aliquet est risus, et fermentum purus rutrum quis.",
    "Integer nulla justo, egestas sit amet nulla et, mollis consectetur sem. Sed placerat metus eu mauris ornare dapibus. In consequat, orci eget tincidunt egestas, nunc nulla dignissim nulla, in tempus nisl velit a nulla.",
    "Maecenas euismod eros lacus, vitae molestie nisl dapibus quis. Donec convallis tempus congue. Suspendisse potenti. In hac habitasse platea dictumst.",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-6">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>By {post.author}</span>
        </div>
        
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto rounded-lg mb-8 object-cover"
        />
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">{post.excerpt}</p>
          
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700">{paragraph}</p>
          ))}
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Styling Tips</h2>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Pair graphic tees with solid color pants or jeans for a balanced look</li>
            <li>Layer with an open button-up shirt or light jacket for added dimension</li>
            <li>Choose accessories that complement, not compete with, your t-shirt design</li>
            <li>For a more polished look, tuck in the front of your tee and add a belt</li>
          </ul>
          
          <blockquote className="border-l-4 border-brand-purple pl-4 my-8 italic">
            Fashion is about dressing according to what's fashionable. Style is more about being yourself.
            <cite className="block mt-2 text-right">— Oscar de la Renta</cite>
          </blockquote>
          
          <p className="text-gray-700 mb-6">
            Remember, the best way to wear any piece from ThreadVibe is with confidence. Our designs are made to help you express your unique personality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
