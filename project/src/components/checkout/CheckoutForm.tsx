import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryDetails, OrderItem } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCartStore } from '../../store/cartStore';
import { createOrder } from '../../services/orderService';

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const getTotalAmount = useCartStore((state) => state.getTotalAmount);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [formData, setFormData] = useState<DeliveryDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Convert cart items to order items
  const orderItems: OrderItem[] = cartItems.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
    priceAtOrder: item.product.price,
  }));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name as keyof DeliveryDetails]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryDetails> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const order = createOrder({
        items: orderItems,
        deliveryDetails: formData,
        totalAmount: getTotalAmount(),
      });
      
      // Clear the cart after successful order creation
      clearCart();
      
      // Navigate to order confirmation page
      navigate(`/orders/${order.id}`, { state: { newOrder: true } });
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <Input
                type="text"
                name="name"
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                fullWidth
                required
              />
              
              <Input
                type="email"
                name="email"
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                fullWidth
                required
              />
              
              <Input
                type="tel"
                name="phone"
                id="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                fullWidth
                required
              />
              
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  name="address"
                  id="address"
                  label="Delivery Address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  fullWidth
                  required
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              <ul className="divide-y divide-gray-200 mb-6">
                {cartItems.map((item) => (
                  <li key={item.product.id} className="py-4 flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} {item.product.unit}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${getTotalAmount().toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">Free</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${(getTotalAmount() * 0.1).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 font-bold">
                  <p className="text-base text-gray-900">Total</p>
                  <p className="text-base text-gray-900">
                    ${(getTotalAmount() + getTotalAmount() * 0.1).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-4"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Place Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};