import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { getCurrentUser } from '../../services/authService';

export const CartSummary: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const getTotalAmount = useCartStore((state) => state.getTotalAmount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const user = getCurrentUser();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
        <div className="mt-6">
          <Button onClick={() => navigate('/products')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.product.id} className="p-4 sm:p-6 animate-slide-up">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full sm:w-32 h-32 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 sm:ml-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            ${item.product.price.toFixed(2)}/{item.product.unit}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-col items-end">
                          <p className="text-lg font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-red-600 hover:text-red-800"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <label htmlFor={`quantity-${item.product.id}`} className="text-sm font-medium text-gray-700 mr-3">
                          Quantity:
                        </label>
                        <select
                          id={`quantity-${item.product.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                          className="block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        >
                          {[...Array(20).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <span className="ml-2 text-sm text-gray-500">
                          {item.product.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  ${getTotalAmount().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Free</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">
                  ${(getTotalAmount() * 0.1).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">
                  ${(getTotalAmount() + getTotalAmount() * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full flex items-center justify-center"
              onClick={handleCheckout}
            >
              <Check size={18} className="mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};