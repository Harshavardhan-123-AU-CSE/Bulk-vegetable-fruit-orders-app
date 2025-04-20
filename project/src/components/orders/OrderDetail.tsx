import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clipboard, CheckCircle, Clock, Truck } from 'lucide-react';
import { Order } from '../../types';
import { getOrderById } from '../../services/orderService';
import { getProductById } from '../../services/productService';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewOrder = location.state?.newOrder;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const fetchedOrder = getOrderById(id);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      }
      setLoading(false);
    }
  }, [id]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clipboard className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'in-progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown Status';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 w-60 rounded mb-6"></div>
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
        <Button onClick={() => navigate('/orders')}>View All Orders</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {isNewOrder && (
        <div className="mb-8 bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-green-800">Order Placed Successfully!</h3>
              <p className="text-green-700">
                Your order has been placed and will be processed soon.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        className="mb-6 flex items-center"
        onClick={() => navigate('/orders')}
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Orders
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <Badge variant={getStatusColor(order.status) as any} className="mt-2 md:mt-0 text-base py-1 px-3">
          <span className="flex items-center">
            {getStatusIcon(order.status)}
            <span className="ml-1">{getStatusText(order.status)}</span>
          </span>
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="divide-y divide-gray-200">
              <div className="pb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId);
                    return (
                      <li key={item.productId} className="py-4 flex">
                        <div className="flex-shrink-0">
                          {product && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-1 flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {product ? product.name : 'Product not found'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Quantity: {item.quantity} {product?.unit}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.priceAtOrder * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="py-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">Free</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Tax</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${(order.totalAmount * 0.1).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <dt className="text-base font-medium text-gray-900">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${(order.totalAmount + order.totalAmount * 0.1).toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h2>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Name</h4>
                    <p className="mt-1">{order.deliveryDetails.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="mt-1">{order.deliveryDetails.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p className="mt-1">{order.deliveryDetails.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Delivery Address</h4>
                    <p className="mt-1">{order.deliveryDetails.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h2>
                <p className="mb-4 text-gray-600">
                  If you have any questions or concerns about your order, please contact us.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:support@freshbulk.com'}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};