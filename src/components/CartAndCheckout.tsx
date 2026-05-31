/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { Trash2, ShieldCheck, Ticket, Plus, Minus, ArrowRight, CornerDownRight, CreditCard, Loader2 } from 'lucide-react';

interface CartAndCheckoutProps {
  cart: CartItem[];
  currentUser: User | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onCheckoutComplete: (order: Order) => void;
  onSwitchToAuth: () => void;
}

export const CartAndCheckout: React.FC<CartAndCheckoutProps> = ({
  cart,
  currentUser,
  onUpdateQuantity,
  onClearCart,
  onCheckoutComplete,
  onSwitchToAuth,
}) => {
  const [step, setStep] = useState<number>(1);
  
  // Form Details
  const [fullName, setFullName] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  
  // Payment card info
  const [ccNumber, setCcNumber] = useState<string>('');
  const [ccExpiry, setCcExpiry] = useState<string>('');
  const [ccCvv, setCcCvv] = useState<string>('');

  // Processing state / Terminal Animation
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [terminalTicks, setTerminalTicks] = useState<string[]>([]);
  const [currentTickIdx, setCurrentTickIdx] = useState<number>(0);

  // Auto-fill fields if user is logged in
  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      setFullName(currentUser.address.fullName);
      setStreet(currentUser.address.street);
      setCity(currentUser.address.city);
      setZipCode(currentUser.address.zipCode);
      setCountry(currentUser.address.country);
    }
  }, [currentUser]);

  // Calculations
  const itemTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = itemTotal > 200 ? 0.00 : 25.00;
  const stateTax = itemTotal * 0.0825; // 8.25% tax
  const checkoutGrandTotal = itemTotal + shippingFee + stateTax;

  const terminalPreTicks = [
    '⚡ READY SECURE CONNECTION: ESTABLISHING MUTUAL HANDSHAKE...',
    '⚙️ INITIATING TRANSACTIONS GATEWAY DIRECT TO CLEARING SYSTEM...',
    '🔑 TRANSMITTING PARSED ADDRESS REGISTRY BINARIES...',
    '💳 TOKENS CONVERTED AT CLEARING LEVEL: DISPATCHING SSL CERTIFICATION...',
    '🧾 GENERATING THERMAL POS RECEIPT DATA MATRIX...',
    '✅ SUCCESS: INVOICE GENERATED & RECORDED TO INTERNAL INDEX.'
  ];

  const handleStartProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !street || !city || !zipCode) {
      alert('Registry Error: Shipping data missing from ledger fields.');
      return;
    }
    if (!ccNumber || !ccExpiry || !ccCvv) {
      alert('Clearing Error: Credit Card details empty.');
      return;
    }

    setIsProcessing(true);
    setTerminalTicks([]);
    setCurrentTickIdx(0);
  };

  useEffect(() => {
    if (isProcessing && currentTickIdx < terminalPreTicks.length) {
      const timer = setTimeout(() => {
        setTerminalTicks((prev) => [...prev, terminalPreTicks[currentTickIdx]]);
        setCurrentTickIdx((prev) => prev + 1);
      }, 760);
      return () => clearTimeout(timer);
    } else if (isProcessing && currentTickIdx === terminalPreTicks.length) {
      // Finished all ticks! Complete checkout and trigger receipt order payload.
      const timer = setTimeout(() => {
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const uniqueTicket = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
        const orderPayload: Order = {
          id: orderId,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          items: [...cart],
          total: checkoutGrandTotal,
          fullName,
          address: `${street}, ${city}, ${zipCode}, ${country}`,
          paymentMethod: `Credit Card (ending in ${ccNumber.slice(-4)})`,
          status: 'Processing',
          ticketNumber: uniqueTicket
        };

        onCheckoutComplete(orderPayload);
        setIsProcessing(false);
        setStep(4); // Trigger invoice completion modal/step
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentTickIdx]);

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="border-4 border-black bg-white p-12 text-center rounded-sm font-mono shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
        <Trash2 className="h-12 w-12 mx-auto mb-4 text-black opacity-45" />
        <h3 className="font-black text-lg uppercase tracking-wider mb-2">Shopping Basket Empty</h3>
        <p className="text-xs text-zinc-600 mb-6 font-medium leading-relaxed">
          Your secure desktop active shopping memory register is clean. Populate your queue with catalog artifacts to proceed to checkout clearing systems.
        </p>
        <button
          onClick={onSwitchToAuth}
          className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase text-xs py-2.5 px-6 transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(110,110,110,1)]"
        >
          Check Operator Login Status
        </button>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden text-left font-mono">
      {/* Top Banner exactly as retro macOS window */}
      <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-white border border-black inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-white border border-black inline-block"></span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400 inline" />
          <span>SECURE_CHECKOUT_GATEWAY.ELF</span>
        </span>
        <div className="w-10 h-1 bg-white opacity-40"></div>
      </div>

      {/* Progress navigation trail */}
      <div className="bg-zinc-100 border-b-2 border-black grid grid-cols-4 font-bold text-[10px] sm:text-xs text-center uppercase tracking-wider overflow-x-auto">
        <div className={`py-3 border-r-2 border-black ${step === 1 ? 'bg-black text-white' : 'text-black'}`}>
          1. Review Basket
        </div>
        <div className={`py-3 border-r-2 border-black ${step === 2 ? 'bg-black text-white' : 'text-black'}`}>
          2. Destination
        </div>
        <div className={`py-3 border-r-2 border-black ${step === 3 ? 'bg-black text-white' : 'text-black'}`}>
          3. Clear Card
        </div>
        <div className={`py-3 ${step === 4 ? 'bg-black text-white' : 'text-black'}`}>
          4. Receipt Order
        </div>
      </div>

      {isProcessing ? (
        // Live processing monitor screen
        <div className="p-8 bg-zinc-950 text-emerald-400 border-b-2 border-black min-h-[350px] flex flex-col justify-between font-mono">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-zinc-500 text-xs pb-3 border-b border-zinc-800">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
              <span className="font-bold uppercase text-zinc-400">ACTIVE TRANSACTIONS ROUTER SECURE SHIELD</span>
            </div>

            <div className="space-y-2 text-xs">
              {terminalTicks.map((tick, i) => (
                <div key={i} className="flex items-center space-x-2 animate-fadeIn">
                  <span className="text-emerald-500 font-bold select-none">[ok]</span>
                  <span>{tick}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-3 mt-4 text-[11px] text-zinc-500 flex justify-between uppercase">
            <span>BITLINK // ONLINE / STABLE</span>
            <span>RSA-4096-CTR ENCRYPTION ACCREDITED</span>
          </div>
        </div>
      ) : (
        <div className="p-6">
          {/* STEP 1: REVIEW SHOPPING BASKET ITEMS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-2 border-black rounded-sm overflow-hidden">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-black text-[10px] uppercase font-bold text-zinc-600">
                      <th className="p-3">Product Spec</th>
                      <th className="p-3 text-center hidden sm:table-cell">Unit Cost</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.product.id} className="border-b border-black last:border-b-0 hover:bg-neutral-50">
                        <td className="p-3 flex items-start space-x-3">
                          <span className="text-base select-none shrink-0 py-0.5 mt-0.5">📟</span>
                          <div>
                            <span className="font-extrabold text-black block">{item.product.name}</span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase">{item.product.category} ({item.product.year})</span>
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold hidden sm:table-cell">
                          ${item.product.price.toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center border border-black rounded-sm bg-white overflow-hidden text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-zinc-100 active:bg-zinc-200"
                            >
                              <Minus className="h-3 w-3 text-black" />
                            </button>
                            <span className="px-3 font-extrabold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-zinc-100 active:bg-zinc-200"
                            >
                              <Plus className="h-3 w-3 text-black" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right font-black">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal calculation view */}
              <div className="border-t-2 border-black pt-4 flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4">
                <button
                  onClick={onClearCart}
                  className="px-4 py-1.5 border border-black hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase"
                >
                  Clear Queue Memory
                </button>

                <div className="w-full md:w-80 border-4 border-black p-4 bg-gray-50 flex flex-col space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-bold">LEDGER SUM:</span>
                    <span className="font-extrabold">${itemTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-bold">STATE TRANSPORT FEE:</span>
                    <span className="font-bold">{shippingFee === 0 ? 'FREE (OVER $200)' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-bold">ACCREDITED OS TAX (8.25%):</span>
                    <span className="font-bold">${stateTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-black pt-2 flex justify-between font-black text-sm">
                    <span className="text-black uppercase">Grand Ledger Total:</span>
                    <span className="bg-yellow-100 border border-black px-1.5">${checkoutGrandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Secure proceed bar */}
              <div className="flex justify-between items-center bg-zinc-100 p-4 border-2 border-black">
                <div className="flex items-center space-x-2 text-xs text-zinc-600 font-bold">
                  <ShieldCheck className="h-5 w-5 text-zinc-800" />
                  <span className="hidden sm:inline">ACCIDENT PREVENTATIVE SECURE CLEARING SYSTEM</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-extrabold uppercase text-xs py-2 px-5 transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_#000] flex items-center space-x-1.5"
                >
                  <span>Select Destination</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING DESTINATION REGISTRY */}
          {step === 2 && (
            <div className="space-y-6">
              {!currentUser && (
                <div className="bg-yellow-50 border-2 border-black p-4 text-xs font-mono flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-black text-yellow-800 block">💡 QUICK ASSISTANCE PRE-SELECTOR AVAILABLE</span>
                    <p className="text-zinc-600">Register or sign in with your Operator ID to prefill address structures in 1-click.</p>
                  </div>
                  <button
                    onClick={onSwitchToAuth}
                    className="border border-black bg-white px-3 py-1 font-bold text-[10px] hover:bg-black hover:text-white uppercase"
                  >
                    Go To Terminal
                  </button>
                </div>
              )}

              <div className="border-4 border-black p-6 bg-white space-y-4">
                <h3 className="font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block mb-2">
                  Destination Shipping Manifest Fields
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500">Legal Recipient Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Steve Jobs"
                      className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500">Physical Street Address *</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. 2005 Bandley Dr"
                      className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500">Municipal City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Cupertino"
                      className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500">Postal Zip *</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="e.g. 95014"
                        className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500">Country *</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Proceed Bar */}
              <div className="flex justify-between items-center bg-zinc-100 p-4 border-2 border-black">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-black hover:bg-neutral-200 font-bold uppercase text-xs"
                >
                  Back To Cart
                </button>
                <button
                  onClick={() => {
                    if (!fullName || !street || !city || !zipCode) {
                      alert('Operator Warning: Please complete all shipping destination boxes.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-extrabold uppercase text-xs py-2 px-5 transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_#000] flex items-center space-x-1.5"
                >
                  <span>Select Payments</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT CLEARING AND CARD DATA ENTRY */}
          {step === 3 && (
            <div className="space-y-6">
              <form onSubmit={handleStartProcessing} className="space-y-4">
                <div className="border-4 border-black p-6 bg-white space-y-4">
                  <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-2">
                    <h3 className="font-black text-sm uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block">
                      Secure Payment Clearing Form
                    </h3>
                    <div className="flex space-x-1.5 text-zinc-500">
                      <CreditCard className="h-5 w-5 text-black" />
                      <span className="text-[10px] font-bold text-zinc-700">SSL_ACTIVE_SECURE_PAY_1148</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500 mb-1">Credit Card Number *</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={ccNumber}
                        onChange={(e) => setCcNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4111 2222 3333 4444"
                        className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black text-sm tracking-widest"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500 mb-1">Expiration MM/YY *</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={ccExpiry}
                          onChange={(e) => setCcExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black text-sm tracking-wider"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-[10px] text-zinc-500 mb-1">Security Digit CVV *</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={ccCvv}
                          onChange={(e) => setCcCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full border-2 border-black px-3 py-2 bg-white text-black font-bold focus:outline-none focus:ring-1 focus:ring-black text-sm tracking-widest"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-total quick check */}
                <div className="bg-gray-150 p-4 border-2 border-black flex items-center justify-between text-xs font-bold leading-normal">
                  <div className="flex items-center space-x-1">
                    <span className="text-zinc-500">BILLING_QUEUE_SUM:</span>
                    <span className="bg-black text-white px-2 py-0.5 rounded-sm">${checkoutGrandTotal.toFixed(2)}</span>
                  </div>
                  <span className="text-zinc-400 text-[10px]">INCLUDES TAXES AND ROUTING FEES</span>
                </div>

                {/* Navigation Proceed Bar */}
                <div className="flex justify-between items-center bg-zinc-100 p-4 border-2 border-black">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-black hover:bg-neutral-200 font-bold uppercase text-xs"
                  >
                    Back to Address
                  </button>
                  <button
                    type="submit"
                    className="border-2 border-black bg-emerald-500 text-black hover:bg-black hover:text-white font-extrabold uppercase text-xs py-2 px-6 transition-all duration-150 transform hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_#000] flex items-center space-x-1.5"
                  >
                    <span>Authorize Transaction</span>
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT MODAL */}
          {step === 4 && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 border-4 border-black rounded-full flex items-center justify-center mx-auto animate-bounce mb-3">
                <ShieldCheck className="h-8 w-8 text-black" />
              </div>

              <div className="space-y-2">
                <h3 className="font-black text-lg uppercase tracking-wider text-black">Cleared Transaction Success</h3>
                <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                  The clearing terminal has approved your account authorization query. The purchase catalog ticket certificates have been registered in storage.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => {
                    setStep(1);
                    onClearCart();
                  }}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase text-xs py-2.5 px-6 transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  Return to Store index
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
