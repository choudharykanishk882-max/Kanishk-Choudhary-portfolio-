/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Product, CartItem, User, Order } from './types';
import { MacHero } from './components/MacHero';
import { ProductCatalog } from './components/ProductCatalog';
import { AuthSystem } from './components/AuthSystem';
import { CartAndCheckout } from './components/CartAndCheckout';
import { ThermalReceipt } from './components/ThermalReceipt';
import { Laptop, Database, UserCheck, ShieldAlert, ShoppingBag, Terminal, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'auth' | 'checkout'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);

  // 1. Initial State Loaders from client memory
  useEffect(() => {
    // Current Active Session
    const activeSession = localStorage.getItem('mac_store_active_user');
    if (activeSession) {
      setCurrentUser(JSON.parse(activeSession));
    }

    // Active Cart
    const activeCart = localStorage.getItem('mac_store_cart');
    if (activeCart) {
      setCart(JSON.parse(activeCart));
    }

    // Orders lists
    const activeOrders = localStorage.getItem('mac_store_orders');
    if (activeOrders) {
      setOrders(JSON.parse(activeOrders));
    }
  }, []);

  // 2. Synchronize memory registers
  const updateCachedCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('mac_store_cart', JSON.stringify(newCart));
  };

  const updateCachedOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('mac_store_orders', JSON.stringify(newOrders));
  };

  // 3. User operations
  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('mac_store_active_user', JSON.stringify(user));
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mac_store_active_user');
  };

  // 4. Basket operations
  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updateCachedCart(updated);
    } else {
      updateCachedCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const filtered = cart.filter((item) => item.product.id !== productId);
      updateCachedCart(filtered);
    } else {
      const updated = cart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      updateCachedCart(updated);
    }
  };

  const handleClearCart = () => {
    updateCachedCart([]);
  };

  // 5. Checkout Clearing process callback
  const handleCheckoutComplete = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    updateCachedOrders(updatedOrders);
    handleClearCart();
    setActiveInvoice(newOrder); // Instantly popup receipt!
  };

  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between font-sans selection:bg-black selection:text-white pb-12 antialiased">
      {/* SECTION A: SYSTEM TOP STATUS / WINDOW MENU BAR (Exactly referencing mockup) */}
      <header className="sticky top-0 z-40 bg-white border-b-4 border-black font-mono">
        {/* File window menu look */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo brand */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 font-sans font-black text-lg tracking-tight text-black border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-75"
          >
            <span className="text-xl">💾</span>
            <span className="uppercase text-sm tracking-widest font-black font-mono">Macintosh Deck</span>
          </button>

          {/* Navigation Links centered, same layout blocks as in the mockup screenshot */}
          <nav className="flex flex-wrap items-center justify-center gap-1 bg-neutral-100 border-2 border-black p-1 text-xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all duration-100 ${activeTab === 'home' ? 'bg-black text-white' : 'hover:bg-neutral-200 text-black'}`}
            >
              🏠 Client Desk
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all duration-100 ${activeTab === 'catalog' ? 'bg-black text-white' : 'hover:bg-neutral-200 text-black'}`}
            >
              📦 Product Catalog
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all duration-100 ${activeTab === 'auth' ? 'bg-black text-white' : 'hover:bg-neutral-200 text-black'}`}
            >
              👤 Member Registry {currentUser && '●'}
            </button>
            <button
              onClick={() => setActiveTab('checkout')}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all duration-100 relative ${activeTab === 'checkout' ? 'bg-black text-white' : 'hover:bg-neutral-200 text-black'}`}
            >
              🛒 Secure Checkout
              {totalCartUnits > 0 && (
                <span className="ml-1.5 bg-[#EF4444] text-white px-1.5 py-0.5 rounded-sm text-[9px] font-black tracking-normal">
                  {totalCartUnits}
                </span>
              )}
            </button>
          </nav>

          {/* Status badge */}
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            {currentUser?.isLoggedIn ? (
              <span className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 border-2 border-black px-2.5 py-1 font-bold rounded-sm text-[10px]">
                <UserCheck className="h-3 w-3 inline text-black" />
                <span>ONLINE: @{currentUser.username}</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5 bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded text-[10px]">
                <ShieldAlert className="h-3 w-3 inline text-zinc-400" />
                <span>GUEST SESSION</span>
              </span>
            )}
          </div>

        </div>
      </header>

      {/* SECTION B: APP CONTENT PORTAL */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Navigation router viewports */}
        <div className="animate-fadeIn">
          {activeTab === 'home' && (
            <MacHero
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="text-left font-mono space-y-1">
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest inline-block">
                  CATALOG_REGISTRY.SYS
                </span>
                <h2 className="text-3xl font-display font-black tracking-tight uppercase">
                  Boutique Hardware Registry
                </h2>
                <p className="text-xs text-zinc-500 font-bold">
                  Review original vintage systems, accessories, floppy softwares, and SCSI storage extensions.
                </p>
              </div>
              
              <ProductCatalog
                onAddToCart={(prod) => {
                  handleAddToCart(prod);
                  alert(`Added ${prod.name} successfully to your active clearing order!`);
                }}
                cart={cart}
              />
            </div>
          )}

          {activeTab === 'auth' && (
            <div className="space-y-6">
              <div className="text-left font-mono space-y-1">
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest inline-block">
                  AUTHENTICATION_PROTOCOL.SYS
                </span>
                <h2 className="text-3xl font-display font-black tracking-tight uppercase">
                  Operator Session Registry
                </h2>
                <p className="text-xs text-zinc-500 font-bold">
                  Sign up user accounts or login to prefill shipping grids and log previous sales receipts.
                </p>
              </div>

              <AuthSystem
                currentUser={currentUser}
                onLogin={handleUserLogin}
                onLogout={handleUserLogout}
                dbOrders={orders}
                onOpenReceipt={(ord) => setActiveInvoice(ord)}
              />
            </div>
          )}

          {activeTab === 'checkout' && (
            <div className="space-y-6">
              <div className="text-left font-mono space-y-1">
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest inline-block">
                  CLEARING_HOUSE_TRANSACTIONS.SYS
                </span>
                <h2 className="text-3xl font-display font-black tracking-tight uppercase">
                  Secure Clearing Hub
                </h2>
                <p className="text-xs text-zinc-500 font-bold">
                  Execute secure credit clearing triggers and generate authentic receipt invoices instantly.
                </p>
              </div>

              <CartAndCheckout
                cart={cart}
                currentUser={currentUser}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onCheckoutComplete={handleCheckoutComplete}
                onSwitchToAuth={() => setActiveTab('auth')}
              />
            </div>
          )}
        </div>

      </main>

      {/* SECTION C: THERMAL INVOICE MODALS POPUP */}
      <ThermalReceipt
        order={activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />

      {/* SECTION D: SUBTLE SYSTEM FOOTER FOOTPRINT (Strictly Clean layout) */}
      <footer className="border-t-4 border-black bg-white py-6 mt-16 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="flex items-center space-x-2 text-zinc-600 font-bold text-[10px]">
            <span>SYSTEM STATE: OPERATION_READY</span>
            <span className="text-zinc-300">|</span>
            <span>SECURE CLEARING: ACCREDITED</span>
          </div>

          <div className="flex items-center space-x-2 text-zinc-500">
            <span>Powered by</span>
            <span className="bg-black text-white px-2 py-0.5 font-black uppercase text-[10px] tracking-wide">
              AI STUDIO
            </span>
          </div>

          <div className="flex items-center space-x-1 text-zinc-600 font-bold text-[10px]">
            <span>MADE WITH</span>
            <Heart className="h-3.5 w-3.5 fill-black text-black inline animate-pulse" />
            <span>FOR RETRO WORKERS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
