import React, { useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { getAllOrders } from '../../services/orderService';
import { getAllProducts } from '../../services/productService';
import { AdminOrderList } from './AdminOrderList';
import { AdminProductList } from './AdminProductList';
import { Card, CardContent } from '../ui/Card';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  
  const orders = getAllOrders();
  const products = getAllProducts();
  
  const totalSales = orders.reduce(
    (total, order) => total + order.totalAmount,
    0
  );
  
  const pendingOrders = orders.filter(
    (order) => order.status === 'pending'
  ).length;
  
  const inProgressOrders = orders.filter(
    (order) => order.status === 'in-progress'
  ).length;
  
  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <ShoppingCart className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Orders
                  </dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900">
                      {orders.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                <Package className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900">
                      {products.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Sales
                  </dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900">
                      ${totalSales.toFixed(2)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Order Status
                  </dt>
                  <dd>
                    <div className="text-sm text-gray-900 mt-1">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
                        <span>Pending: {pendingOrders}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>In Progress: {inProgressOrders}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Delivered: {deliveredOrders}</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'orders'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Manage Orders
          </button>
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'products'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'orders' ? (
            <AdminOrderList />
          ) : (
            <AdminProductList />
          )}
        </div>
      </div>
    </div>
  );
};