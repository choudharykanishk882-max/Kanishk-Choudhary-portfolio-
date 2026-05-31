/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Brushes & Textures' | 'VFX Overlays' | 'Vector Kits' | 'LUTs & Color';
  imageUrl: string;
  specs: string[];
  year: string;
  filename: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
  email: string;
  address: {
    fullName: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  cardNumber?: string;
  isLoggedIn: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  fullName: string;
  address: string;
  paymentMethod: string;
  status: 'Completed' | 'Shipped' | 'Processing';
  ticketNumber: string;
}
