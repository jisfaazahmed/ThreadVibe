
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Fashion Blogger",
    content: "ThreadVibe has quickly become my go-to for premium tees. The fabric quality is exceptional, and the designs are always fresh and exciting.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Mark T.",
    role: "Graphic Designer",
    content: "As someone who's particular about design and quality, ThreadVibe exceeds my expectations. Their graphic tees are works of art that last wash after wash.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Alex N.",
    role: "Musician",
    content: "On stage or off, ThreadVibe tees are my uniform. Comfortable enough for all-day wear and stylish enough for performances.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Real reviews from people who love our products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.992 3.15 1.144-6.666L.298 7.38l6.684-.973L10 .5l3.018 5.908 6.684.973-4.854 4.688 1.144 6.666z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
