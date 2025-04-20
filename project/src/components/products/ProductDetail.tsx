import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { getProductById } from '../../services/productService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCartStore } from '../../store/cartStore';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      }
      setLoading(false);
    }
  }, [id]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <Button
        variant="ghost"
        className="mb-6 flex items-center"
        onClick={() => navigate('/products')}
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <Badge 
            variant={product.category === 'vegetable' ? 'primary' : 'accent'}
            className="mb-3"
          >
            {product.category}
          </Badge>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="text-2xl font-bold text-primary-700 mb-4">
            ${product.price.toFixed(2)}/{product.unit}
          </div>
          
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity ({product.unit})
            </label>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={decreaseQuantity}
                className="h-10 w-10 p-0"
              >
                <Minus size={18} />
              </Button>
              <span className="mx-4 text-lg font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                onClick={increaseQuantity}
                className="h-10 w-10 p-0"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-lg font-medium">
              Total: ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
          
          <Button 
            onClick={handleAddToCart} 
            className="w-full md:w-auto"
            size="lg"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {product.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {product.category}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  ${product.price.toFixed(2)}/{product.unit}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {product.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};