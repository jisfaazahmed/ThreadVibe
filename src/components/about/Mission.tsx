
import React from "react";

const Mission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="ThreadVibe team working"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At ThreadVibe, we're on a mission to create high-quality, ethically produced clothing that empowers individual expression while minimizing our environmental footprint.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that fashion doesn't have to come at the expense of our planet or the people who make our products. Every ThreadVibe item is crafted with care, using sustainable materials and fair labor practices.
            </p>
            <p className="text-gray-700">
              Our goal is to build a brand that resonates with the values of the modern consumer: quality, sustainability, authenticity, and style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
