import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Get all products
export const getAllProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  const products = getAllProducts();
  return products.find((product) => product.id === id);
};

// Add new product
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const newProduct = { ...product, id: uuidv4() };
  const products = getAllProducts();
  const updatedProducts = [...products, newProduct];
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  return newProduct;
};

// Update product
export const updateProduct = (product: Product): Product => {
  const products = getAllProducts();
  const updatedProducts = products.map((p) => 
    p.id === product.id ? product : p
  );
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  return product;
};

// Delete product
export const deleteProduct = (id: string): void => {
  const products = getAllProducts();
  const updatedProducts = products.filter((p) => p.id !== id);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
};

// Filter products by category
export const getProductsByCategory = (category: 'vegetable' | 'fruit'): Product[] => {
  const products = getAllProducts();
  return products.filter((product) => product.category === category);
};