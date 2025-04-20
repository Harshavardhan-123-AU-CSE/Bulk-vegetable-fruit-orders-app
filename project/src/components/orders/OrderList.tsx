import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Truck, CheckCircle, ClipboardList, Search } from 'lucide-react';
import { Order } from '../../types';
import { getAllOrders } from '../../services/orderService';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { getCurrentUser } from '../../services/authService';

export const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const user = getCurrentUser();
  
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/orders');
      return;
    }
    
    const fetchOrders = () => {
      const allOrders = getAllOrders();
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    };
    
    fetchOrders();
  }, [navigate, user]);
  
  useEffect(() => {
    let filtered = orders;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    // Apply search filter (on order ID)
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((order) => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="warning" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="primary" className="flex items-center">
            <Truck className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="success" className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        );
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'in-progress' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('in-progress')}
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === 'delivered' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('delivered')}
            >
              Delivered
            </Button>
          </div>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {orders.length === 0
              ? "You haven't placed any orders yet."
              : "No orders match your current filters."}
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate('/products')}>Start Shopping</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order #{order.id.slice(0, 8)}
                      </h2>
                      <span className="ml-3">{getStatusBadge(order.status)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-sm font-medium text-gray-900">
                      Total: ${(order.totalAmount + order.totalAmount * 0.1).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};