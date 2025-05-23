
import React from "react";

const features = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "Our shirts are crafted from 100% organic cotton for exceptional comfort and durability. Each piece is designed to last and get better with every wash.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 22a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 3a9.5 9.5 0 0 0-9.5 9.5A9.5 9.5 0 0 0 12 22Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Sustainable Production",
    description:
      "Eco-friendly materials and ethical manufacturing processes are at the heart of our business. We're committed to reducing our environmental impact.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Original Designs",
    description:
      "Our in-house design team creates unique graphics and patterns that you won't find anywhere else. Express your individuality with our exclusive styles.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Fast Shipping",
    description:
      "Orders ship within 24 hours and arrive at your doorstep in 2-5 business days. We offer free shipping on all orders over $100.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose ThreadVibe</h2>
          <p className="text-gray-600 mt-2">The difference is in the details</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex gap-4 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-brand-purple">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
