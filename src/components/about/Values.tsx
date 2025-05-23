
import React from "react";

const values = [
  {
    id: 1,
    title: "Quality",
    description:
      "We never compromise on the materials, craftsmanship, or attention to detail that goes into every ThreadVibe product.",
  },
  {
    id: 2,
    title: "Sustainability",
    description:
      "From organic materials to eco-friendly packaging, we make choices that minimize our environmental impact.",
  },
  {
    id: 3,
    title: "Authenticity",
    description:
      "We believe in creating original designs and being transparent about our processes and business practices.",
  },
  {
    id: 4,
    title: "Community",
    description:
      "We value the diverse community of customers, employees, and partners who make ThreadVibe possible.",
  },
];

const Values = () => {
  return (
    <section className="py-16 bg-brand-teal-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <p className="text-gray-700 mt-2">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <div 
              key={value.id} 
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
