import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2 text-primary-600">
              <span className="text-xl font-bold">FreshBulk</span>
            </div>
            <p className="text-gray-600 text-base">
              Providing fresh, quality vegetables and fruits for bulk orders since 2022.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  Products
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/products?category=vegetable" className="text-base text-gray-600 hover:text-gray-900">
                      Vegetables
                    </Link>
                  </li>
                  <li>
                    <Link to="/products?category=fruit" className="text-base text-gray-600 hover:text-gray-900">
                      Fruits
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-base text-gray-600 hover:text-gray-900">
                      All Products
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Shipping
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  Contact Us
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>support@freshbulk.com</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 xl:text-center">
            &copy; 2025 FreshBulk, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};