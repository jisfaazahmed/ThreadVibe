
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  category: string;
  featured: boolean;
  tags: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Urban Classic Tee",
    description: "A timeless classic tee with a modern fit. Made from 100% organic cotton for ultimate comfort and breathability.",
    price: 2999,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1622445275576-721325763ffe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: true,
    tags: ["classic", "essential", "organic"],
    stock: 100
  },
  {
    id: "2",
    name: "Graphic Print Tee",
    description: "Express your style with our eye-catching graphic print tee. Features original artwork on premium cotton blend.",
    price: 3499,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Gray", hex: "#D3D3D3" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: true,
    tags: ["graphic", "artwork", "statement"],
    stock: 75
  },
  {
    id: "3",
    name: "Vintage Wash Tee",
    description: "Our vintage wash process gives this tee a perfectly broken-in look and ultra-soft feel from day one.",
    price: 3299,
    colors: [
      { name: "Washed Blue", hex: "#A0B8D0" },
      { name: "Washed Green", hex: "#A0D0B8" },
      { name: "Washed Pink", hex: "#D0A0B8" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1604006852748-903fecf64d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: true,
    tags: ["vintage", "soft", "faded"],
    stock: 50
  },
  {
    id: "4",
    name: "Minimal Logo Tee",
    description: "Clean and understated with our minimal logo design. Perfect for everyday wear and easy styling.",
    price: 2499,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#808080" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1600387521259-3c605758e3af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: false,
    tags: ["minimal", "logo", "everyday"],
    stock: 120
  },
  {
    id: "5",
    name: "Eco Heavyweight Tee",
    description: "Our heavyweight eco tee is crafted from sustainable materials with a substantial feel and premium finish.",
    price: 3999,
    colors: [
      { name: "Forest Green", hex: "#228B22" },
      { name: "Earth Brown", hex: "#8B4513" },
      { name: "Stone Gray", hex: "#708090" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1596722425774-b9e5f4daf60b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: false,
    tags: ["eco", "heavyweight", "sustainable"],
    stock: 40
  },
  {
    id: "6",
    name: "Color Block Tee",
    description: "Stand out with our bold color block design. Features contrasting panels and a relaxed contemporary fit.",
    price: 3699,
    colors: [
      { name: "Blue/White", hex: "#0000FF" },
      { name: "Black/Red", hex: "#FF0000" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583744946564-b52d01e2e2ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: true,
    tags: ["colorblock", "modern", "bold"],
    stock: 60
  },
  {
    id: "7",
    name: "Essential Pocket Tee",
    description: "The perfect basic with an added chest pocket detail. Made from soft cotton with a relaxed fit.",
    price: 2299,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Heather Gray", hex: "#D3D3D3" },
      { name: "Navy", hex: "#000080" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: false,
    tags: ["pocket", "essential", "basic"],
    stock: 150
  },
  {
    id: "8",
    name: "Striped Sailor Tee",
    description: "Classic striped pattern inspired by traditional sailor uniforms. Made from medium-weight cotton.",
    price: 2899,
    colors: [
      { name: "Navy/White", hex: "#000080" },
      { name: "Black/White", hex: "#000000" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    category: "T-Shirts",
    featured: false,
    tags: ["striped", "nautical", "classic"],
    stock: 70
  },
];

export const blogPosts = [
  {
    id: "blog1",
    title: "How to Style Your Graphic Tee for Any Occasion",
    excerpt: "From casual outings to semi-formal events, learn how to make your graphic tee the star of any outfit.",
    author: "Jamie Style",
    date: "2025-05-12",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: "blog2",
    title: "The History of the T-Shirt: From Underwear to Fashion Statement",
    excerpt: "Explore how the humble t-shirt evolved from an undergarment to become the versatile fashion staple we know today.",
    author: "Alex History",
    date: "2025-05-05",
    imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: "blog3",
    title: "Sustainable Fashion: Why Eco-Friendly T-Shirts Matter",
    excerpt: "Learn about the environmental impact of t-shirt production and why choosing sustainable options makes a difference.",
    author: "Morgan Green",
    date: "2025-04-28",
    imageUrl: "https://images.unsplash.com/photo-1606677661991-446cea8ee182?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export const reviewsData = [
  {
    id: "review1",
    productId: "1",
    author: "Chris T.",
    rating: 5,
    title: "Excellent quality and fit",
    comment: "This is the best t-shirt I've ever owned. Super comfortable and fits perfectly. Will definitely buy more!",
    date: "2025-05-10"
  },
  {
    id: "review2",
    productId: "1",
    author: "Sam B.",
    rating: 4,
    title: "Great t-shirt, runs slightly small",
    comment: "Really love the material and design, but it runs a bit smaller than expected. Consider sizing up.",
    date: "2025-05-08"
  },
  {
    id: "review3",
    productId: "2",
    author: "Jordan M.",
    rating: 5,
    title: "Amazing graphic design",
    comment: "The print quality is incredible and hasn't faded after multiple washes. Get compliments every time I wear it!",
    date: "2025-05-05"
  },
  {
    id: "review4",
    productId: "3",
    author: "Taylor S.",
    rating: 5,
    title: "Perfect vintage look",
    comment: "This tee feels like I've had it for years in the best way possible. Super soft and comfortable.",
    date: "2025-04-30"
  }
];
