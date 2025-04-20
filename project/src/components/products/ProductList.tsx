import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Product } from '../../types';
import { getAllProducts, getProductsByCategory } from '../../services/productService';
import { ProductCard } from './ProductCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'vegetable' | 'fruit'>(
    categoryParam === 'vegetable' || categoryParam === 'fruit'
      ? categoryParam
      : 'all'
  );

  useEffect(() => {
    const fetchProducts = () => {
      let fetchedProducts: Product[];
      
      if (activeCategory === 'all') {
        fetchedProducts = getAllProducts();
      } else {
        fetchedProducts = getProductsByCategory(activeCategory);
      }
      
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    
    fetchProducts();
  }, [activeCategory]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div className="animate-fade-in">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Fresh Products for Bulk Orders
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={activeCategory === 'all' ? 'primary' : 'outline'}
                onClick={() => setActiveCategory('all')}
              >
                All
              </Button>
              <Button
                variant={activeCategory === 'vegetable' ? 'primary' : 'outline'}
                onClick={() => setActiveCategory('vegetable')}
              >
                Vegetables
              </Button>
              <Button
                variant={activeCategory === 'fruit' ? 'primary' : 'outline'}
                onClick={() => setActiveCategory('fruit')}
              >
                Fruits
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};