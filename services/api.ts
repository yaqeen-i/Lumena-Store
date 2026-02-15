import { Product } from '../types';

// mock data (will implement db later on)
const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Noise-Cancelling Headphones",
    price: 299.99,
    description: "Experience silence and superior sound with our top-tier noise-cancelling headphones. Perfect for travel and focus.",
    category: "electronics",
    image: "https://picsum.photos/400/400?random=1",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 159.50,
    description: "Work in comfort with this fully adjustable ergonomic chair. Lumbar support and breathable mesh back.",
    category: "furniture",
    image: "https://picsum.photos/400/400?random=2",
    rating: { rate: 4.5, count: 85 }
  },
  {
    id: 3,
    title: "Minimalist Mechanical Keyboard",
    price: 89.99,
    description: "Tactile feedback and a sleek design. This mechanical keyboard is a dream for typists and gamers alike.",
    category: "electronics",
    image: "https://picsum.photos/400/400?random=3",
    rating: { rate: 4.7, count: 200 }
  },
  {
    id: 4,
    title: "Eco-Friendly Cotton T-Shirt",
    price: 24.99,
    description: "Soft, breathable, and sustainable. Made from 100% organic cotton.",
    category: "clothing",
    image: "https://picsum.photos/400/400?random=4",
    rating: { rate: 4.3, count: 400 }
  },
  {
    id: 5,
    title: "Smart Fitness Watch",
    price: 199.00,
    description: "Track your health metrics, workouts, and sleep with precision. Stylish design for everyday wear.",
    category: "electronics",
    image: "https://picsum.photos/400/400?random=5",
    rating: { rate: 4.6, count: 150 }
  },
  {
    id: 6,
    title: "Ceramic Coffee Pour-Over Set",
    price: 45.00,
    description: "Brew the perfect cup of coffee with this artisanal ceramic pour-over set.",
    category: "home",
    image: "https://picsum.photos/400/400?random=6",
    rating: { rate: 4.9, count: 60 }
  },
  {
    id: 7,
    title: "Leather Weekender Bag",
    price: 120.00,
    description: "Durable and stylish leather bag for your weekend getaways. Spacious and carry-on friendly.",
    category: "accessories",
    image: "https://picsum.photos/400/400?random=7",
    rating: { rate: 4.7, count: 90 }
  },
  {
    id: 8,
    title: "4K Ultra HD Action Camera",
    price: 349.00,
    description: "Capture your adventures in stunning 4K. Waterproof and shockproof design.",
    category: "electronics",
    image: "https://picsum.photos/400/400?random=8",
    rating: { rate: 4.5, count: 110 }
  }
];

export const getProducts = async (): Promise<Product[]> => {
  // simulate network delay (will replace with real API calls later)
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS), 500);
  });
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS.find(p => p.id === id)), 300);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        if (category === 'all') resolve(PRODUCTS);
        else resolve(PRODUCTS.filter(p => p.category === category));
    }, 400);
  });
};

export const getAllCategories = (): string[] => {
    const categories = new Set(PRODUCTS.map(p => p.category));
    return ['all', ...Array.from(categories)];
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase().trim();
      if (!lowerQuery) {
          resolve([]);
          return;
      }
      const results = PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
      resolve(results);
    }, 300);
  });
};