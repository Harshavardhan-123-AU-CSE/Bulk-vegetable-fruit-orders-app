import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, TruckIcon, CheckCircle, Clock } from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';

export const AdminOrderList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchOrders = () => {
      const allOrders = getAllOrders();
      // Sort orders by date (newest first)
      allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    };
    
    fetchOrders();
  }, []);
  
  useEffect(() => {
    let filtered = orders;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((order) => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);
  
  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrder = updateOrderStatus(orderId, newStatus);
    if (updatedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    }
  };
  
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
            <TruckIcon className="h-3 w-3 mr-1" />
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
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Orders</h2>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('pending')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'in-progress' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('in-progress')}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === 'delivered' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('delivered')}
              size="sm"
            >
              Delivered
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No orders found. Adjust your filters or check back later.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.deliveryDetails.name}</div>
                        <div className="text-xs">{order.deliveryDetails.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(order.totalAmount + order.totalAmount * 0.1).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={order.status === 'pending'}
                            onClick={() => handleStatusChange(order.id, 'pending')}
                          >
                            Pending
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={order.status === 'in-progress'}
                            onClick={() => handleStatusChange(order.id, 'in-progress')}
                          >
                            Process
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={order.status === 'delivered'}
                            onClick={() => handleStatusChange(order.id, 'delivered')}
                          >
                            Deliver
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(order.id)}
                          className="flex items-center"
                        >
                          {expandedOrderId === order.id ? (
                            <>
                              <ChevronUp size={16} className="mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} className="mr-1" />
                              View
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Order Items
                              </h4>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                      Product ID
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                      Quantity
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                      Price
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                      Subtotal
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.items.map((item) => (
                                    <tr key={item.productId}>
                                      <td className="px-3 py-2 text-xs text-gray-500">
                                        {item.productId.slice(0, 8)}
                                      </td>
                                      <td className="px-3 py-2 text-xs text-gray-500">
                                        {item.quantity}
                                      </td>
                                      <td className="px-3 py-2 text-xs text-gray-500">
                                        ${item.priceAtOrder.toFixed(2)}
                                      </td>
                                      <td className="px-3 py-2 text-xs text-gray-500">
                                        ${(item.priceAtOrder * item.quantity).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Delivery Details
                              </h4>
                              <dl className="grid grid-cols-1 gap-y-2">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-xs font-medium text-gray-500">
                                    Name
                                  </dt>
                                  <dd className="text-xs text-gray-900 sm:col-span-2">
                                    {order.deliveryDetails.name}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-xs font-medium text-gray-500">
                                    Email
                                  </dt>
                                  <dd className="text-xs text-gray-900 sm:col-span-2">
                                    {order.deliveryDetails.email}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-xs font-medium text-gray-500">
                                    Phone
                                  </dt>
                                  <dd className="text-xs text-gray-900 sm:col-span-2">
                                    {order.deliveryDetails.phone}
                                  </dd>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                                  <dt className="text-xs font-medium text-gray-500">
                                    Address
                                  </dt>
                                  <dd className="text-xs text-gray-900 sm:col-span-2">
                                    {order.deliveryDetails.address}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};