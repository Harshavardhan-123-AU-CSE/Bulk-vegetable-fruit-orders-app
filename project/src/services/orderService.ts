import { Order, OrderStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Get all orders
export const getAllOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

// Get order by ID
export const getOrderById = (id: string): Order | undefined => {
  const orders = getAllOrders();
  return orders.find((order) => order.id === id);
};

// Create new order
export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
  const newOrder: Order = {
    ...orderData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  
  const orders = getAllOrders();
  const updatedOrders = [...orders, newOrder];
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  
  return newOrder;
};

// Update order status
export const updateOrderStatus = (id: string, status: OrderStatus): Order | undefined => {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex((order) => order.id === id);
  
  if (orderIndex === -1) return undefined;
  
  const updatedOrder = { ...orders[orderIndex], status };
  const updatedOrders = [...orders];
  updatedOrders[orderIndex] = updatedOrder;
  
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  return updatedOrder;
};

// Get orders by status
export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  const orders = getAllOrders();
  return orders.filter((order) => order.status === status);
};