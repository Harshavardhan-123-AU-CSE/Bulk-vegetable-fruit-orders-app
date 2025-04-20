import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Leaf, TruckIcon, BoxIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90 mix-blend-multiply" />
        <div 
          className="relative bg-cover bg-center h-[70vh]"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                Fresh Produce in Bulk for Your Business
              </h1>
              <p className="text-xl text-white mb-8">
                High-quality vegetables and fruits delivered directly to your doorstep. Perfect for restaurants, grocery stores, and food service businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => navigate('/products')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 border-white"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Explore our wide selection of fresh, high-quality produce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="relative rounded-lg overflow-hidden h-80 transform transition-all hover:scale-[1.01]"
              onClick={() => navigate('/products?category=vegetable')}
            >
              <div className="absolute inset-0 bg-black opacity-30 hover:opacity-20 transition-opacity" />
              <img
                src="https://images.pexels.com/photos/3994820/pexels-photo-3994820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fresh Vegetables"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white">Vegetables</h3>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/products?category=vegetable')}
                  >
                    Browse Vegetables
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="relative rounded-lg overflow-hidden h-80 transform transition-all hover:scale-[1.01]"
              onClick={() => navigate('/products?category=fruit')}
            >
              <div className="absolute inset-0 bg-black opacity-30 hover:opacity-20 transition-opacity" />
              <img
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fresh Fruits"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white">Fruits</h3>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/products?category=fruit')}
                  >
                    Browse Fruits
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose FreshBulk?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              We offer the best service for bulk orders of fresh produce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Quality</h3>
              <p className="text-gray-500">
                Our produce is sourced directly from trusted farms, ensuring the freshest quality for your business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <TruckIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-500">
                We deliver your orders quickly and efficiently, so you can focus on running your business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <BoxIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk Orders</h3>
              <p className="text-gray-500">
                Specialized in large quantity orders, perfect for restaurants, grocery stores, and food services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Start ordering fresh produce today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                size="lg"
                onClick={() => navigate('/products')}
                className="bg-white text-primary-700 hover:bg-gray-100"
              >
                Browse Products
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="border-white text-white hover:bg-primary-600"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};