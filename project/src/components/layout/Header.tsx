import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, GanttChart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import { getCurrentUser, logout, isAdmin } from '../../services/authService';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const user = getCurrentUser();
  const admin = isAdmin();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <GanttChart size={28} />
              <span className="text-xl font-bold">FreshBulk</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/products">
              <Button variant="ghost" size="sm">Products</Button>
            </Link>
            
            {admin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">Admin Dashboard</Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/orders')}
                >
                  <User size={20} className="mr-1" />
                  My Orders
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};