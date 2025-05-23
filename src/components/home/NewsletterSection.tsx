
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Thanks for subscribing to our newsletter!");
    setEmail("");
  };
  
  return (
    <section className="bg-brand-purple text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-8">
            Subscribe to our newsletter for exclusive offers, new product alerts, and style tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-white text-brand-purple hover:bg-white/90"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-white/80">
            By subscribing you agree to our Privacy Policy. 
            We promise not to spam your inbox.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
