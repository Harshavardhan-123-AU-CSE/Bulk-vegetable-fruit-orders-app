import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Card className="h-full flex flex-col transition-transform hover:scale-[1.02] hover:shadow-md">
      <div 
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardContent className="flex-grow flex flex-col">
        <Badge 
          variant={product.category === 'vegetable' ? 'primary' : 'accent'}
          className="mb-2 self-start"
        >
          {product.category}
        </Badge>
        
        <h3 
          className="text-lg font-semibold mb-1 cursor-pointer hover:text-primary-600"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
        
        <div className="mt-auto">
          <div className="text-xl font-bold text-primary-700">
            ${product.price.toFixed(2)}/{product.unit}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={decreaseQuantity}
              className="h-8 w-8 p-0"
            >
              <Minus size={16} />
            </Button>
            <span className="mx-3 font-medium">{quantity}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={increaseQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus size={16} />
            </Button>
          </div>
          <span className="font-medium text-gray-500">
            {product.unit}
          </span>
        </div>
        
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};