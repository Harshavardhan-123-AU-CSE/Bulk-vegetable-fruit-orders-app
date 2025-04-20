export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  category: 'vegetable' | 'fruit';
};

export type OrderItem = {
  productId: string;
  quantity: number;
  priceAtOrder: number;
};

export type OrderStatus = 'pending' | 'in-progress' | 'delivered';

export type DeliveryDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  deliveryDetails: DeliveryDetails;
  status: OrderStatus;
  createdAt: string;
  totalAmount: number;
};

export type User = {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
};