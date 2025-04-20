import { Product, Order, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Initial products
export const initialProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Fresh Tomatoes',
    price: 3.99,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Juicy, ripe tomatoes perfect for salads and cooking.',
    category: 'vegetable',
  },
  {
    id: uuidv4(),
    name: 'Organic Apples',
    price: 4.49,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Sweet and crisp apples grown without pesticides.',
    category: 'fruit',
  },
  {
    id: uuidv4(),
    name: 'Fresh Carrots',
    price: 2.99,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Crunchy carrots, ideal for snacking and cooking.',
    category: 'vegetable',
  },
  {
    id: uuidv4(),
    name: 'Ripe Bananas',
    price: 1.99,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Sweet, energy-packed bananas perfect for smoothies.',
    category: 'fruit',
  },
  {
    id: uuidv4(),
    name: 'Fresh Spinach',
    price: 2.49,
    unit: 'bunch',
    image: 'https://images.pexels.com/photos/5945754/pexels-photo-5945754.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Nutrient-rich spinach leaves, perfect for salads and cooking.',
    category: 'vegetable',
  },
  {
    id: uuidv4(),
    name: 'Juicy Oranges',
    price: 3.49,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Sweet and tangy oranges, packed with vitamin C.',
    category: 'fruit',
  },
];

// Initial orders
export const initialOrders: Order[] = [];

// Admin user
export const initialUsers: User[] = [
  {
    id: uuidv4(),
    username: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin',
  },
];

// Store the mock data in localStorage
export const initializeMockData = () => {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
  
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(initialOrders));
  }
  
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
};