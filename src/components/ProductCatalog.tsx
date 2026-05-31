/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { RETRO_PRODUCTS } from '../productsData';
import { ProductIllustration } from './RetroIllustrations';
import { Search, ShoppingBasket, Expand, Eye, FolderHeart, Calendar, CheckSquare } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart, cart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories = ['All', 'Brushes & Textures', 'VFX Overlays', 'Vector Kits', 'LUTs & Color'];

  const filteredProducts = RETRO_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCartQuantity = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const toggleExpandCard = (productId: string) => {
    if (expandedCardId === productId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(productId);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Controls Bar: Search & Category Filter */}
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets database... (e.g., dither, lens flare, brush, LUT)"
              className="w-full border-4 border-black pl-11 pr-4 py-2.5 bg-white text-black text-sm font-bold placeholder-zinc-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Cart Indicator */}
          <div className="flex items-center space-x-2 bg-black text-white px-4 py-2.5 border-4 border-black rounded-sm self-start md:self-auto">
            <ShoppingBasket className="h-5 w-5 text-white" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Selected: {cart.reduce((sum, item) => sum + item.quantity, 0)} Units
            </span>
          </div>
        </div>

        {/* Categories Grid (similar style of navigation links from mockup) */}
        <div className="mt-6 border-t-2 border-dashed border-black pt-5">
          <span className="block font-mono font-black text-sm uppercase mb-3 text-zinc-600 tracking-wider">
            Directory Index Filtering
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`border-2 border-black font-bold text-xs uppercase px-3 py-2 text-center transition-all duration-150 transform hover:bg-black hover:text-white ${
                  selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-black'
                }`}
              >
                {cat} ↗
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Products Catalog formatted as vintage Macintosh application files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const qtyInCart = getCartQuantity(prod.id);
          const isExpanded = expandedCardId === prod.id;

          return (
            <div
              key={prod.id}
              className="border-4 border-black bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Window Header exactly as modeled in the mockup */}
              <div className="bg-gray-200 text-black px-3 py-1.5 flex items-center justify-between border-b-2 border-black font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-black inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-black inline-block"></span>
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tight">
                  {prod.filename}
                </span>
                <span className="font-bold text-[10px] text-zinc-500">{prod.year}</span>
              </div>

              {/* Product Visual Container (Grayscale/dots styling matching high fidelity graphic) */}
              <div className="bg-neutral-100 border-b-2 border-black p-4 relative group flex flex-col items-center justify-center min-h-[170px]">
                {/* Vintage tags */}
                <span className="absolute top-2 left-2 font-mono text-[9px] font-bold border-2 border-black bg-white px-2 py-0.5 uppercase tracking-wide">
                  {prod.category}
                </span>

                {qtyInCart > 0 && (
                  <span className="absolute top-2 right-2 font-mono text-[10px] font-black border-2 border-black bg-black text-white px-2 py-0.5 rounded-sm animate-bounce">
                    {qtyInCart} IN CART
                  </span>
                )}

                {/* Illustration Asset representation */}
                <div className="w-full h-32 flex items-center justify-center p-2">
                  <ProductIllustration iconType={prod.imageUrl} />
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="text-left font-mono space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-black text-sm tracking-tight text-black line-clamp-1">
                      {prod.name}
                    </h3>
                    <span className="font-extrabold text-sm whitespace-nowrap bg-gray-100 border border-black px-1.5 py-0.5">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed min-h-[48px] line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                {/* Embedded dynamic Specs dropdown drawer button */}
                <div className="font-mono pt-1">
                  <button
                    onClick={() => toggleExpandCard(prod.id)}
                    className="w-full border border-black text-[10px] uppercase font-bold py-1 bg-zinc-50 hover:bg-neutral-200 transition-all duration-150 flex items-center justify-center space-x-1"
                  >
                    <span>{isExpanded ? 'Hide Diagnostics' : 'Show Specifications Sheet'}</span>
                    <Expand className={`h-3 w-3 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded spec list */}
                  {isExpanded && (
                    <div className="border border-t-0 border-black p-3 bg-gray-50 space-y-2 mt-0.5 animate-fadeIn">
                      <span className="block font-extrabold text-[9px] uppercase tracking-wider text-zinc-500">
                        System Configuration Matrix:
                      </span>
                      <ul className="space-y-1 text-[10px] text-zinc-800">
                        {prod.specs.map((spec, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-1.5 select-none text-black">▪</span>
                            <span className="leading-snug">{spec}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center space-x-2 text-[9px] font-bold text-zinc-400 uppercase pt-1 border-t border-zinc-200">
                        <Calendar className="h-3 w-3 text-black" />
                        <span>Registered Era: vintage_{prod.year}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Purchase Button */}
                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-full border-2 border-black bg-white hover:bg-black hover:text-white text-black font-mono font-bold uppercase tracking-wider py-2 px-3 text-xs rounded-sm transition-all duration-150 transform active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
                >
                  <ShoppingBasket className="h-4 w-4" />
                  <span>Purchase Artifact</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-span-full border-4 border-dashed border-zinc-300 p-12 text-center rounded-sm font-mono text-zinc-400">
            <FolderHeart className="h-10 w-10 mx-auto mb-3 opacity-55 text-black" />
            <h3 className="font-extrabold text-sm uppercase">No Hardware Entries Located</h3>
            <p className="text-xs mt-1.5">Modify your search query string or filter attributes and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};
