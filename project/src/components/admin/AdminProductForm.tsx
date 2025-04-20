import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { addProduct, updateProduct } from '../../services/productService';

interface AdminProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  onClose,
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: product?.name || '',
    price: product?.price || 0,
    unit: product?.unit || 'kg',
    image: product?.image || '',
    description: product?.description || '',
    category: product?.category || 'vegetable',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === 'price') {
      parsedValue = parseFloat(value) || 0;
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
    });

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!formData.image.match(/^https?:\/\/.+/i)) {
      newErrors.image = 'Invalid image URL format';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (product) {
        // Update existing product
        updateProduct({ ...formData, id: product.id });
      } else {
        // Add new product
        addProduct(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="price" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price.toString()}
                onChange={handleChange}
                error={errors.price}
                step="0.01"
                min="0"
                fullWidth
              />
            </div>

            <div>
              <label 
                htmlFor="unit" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-primary-500 block rounded-md sm:text-sm focus:ring-1 w-full"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="lb">Pound (lb)</option>
                <option value="oz">Ounce (oz)</option>
                <option value="bunch">Bunch</option>
                <option value="piece">Piece</option>
                <option value="dozen">Dozen</option>
              </select>
              {errors.unit && (
                <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
              )}
            </div>
          </div>

          <div>
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-primary-500 block rounded-md sm:text-sm focus:ring-1 w-full"
            >
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="image" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <Input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              placeholder="https://example.com/image.jpg"
              fullWidth
            />
          </div>

          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-primary-500 block rounded-md sm:text-sm focus:ring-1 w-full"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="mr-3"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};