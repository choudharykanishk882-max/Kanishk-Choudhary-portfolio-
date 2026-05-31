/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Order } from '../types';
import { Printer, X, Download } from 'lucide-react';

interface ThermalReceiptProps {
  order: Order | null;
  onClose: () => void;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto backdrop-blur-xs flex items-center justify-center p-4 z-50 font-mono animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-sm flex flex-col items-stretch space-y-4">
        
        {/* Paper Thermal Receipt Container */}
        <div className="bg-amber-50 text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xs relative overflow-hidden flex flex-col">
          
          {/* Jagged / Tear details top */}
          <div className="flex justify-between select-none overflow-hidden -mx-6 -mt-6 mb-4 h-3 bg-zinc-300">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="text-[14px] text-amber-50 leading-none -mt-1 font-sans">▲</span>
            ))}
          </div>

          {/* Close button on receipt top corner */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 border border-black hover:bg-black hover:text-white transition-all p-1"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Brand header */}
          <div className="text-center font-mono space-y-1 mb-4">
            <h2 className="font-black text-sm tracking-wider uppercase">*** RETRO MACINTOSH ***</h2>
            <p className="text-[10px] text-zinc-600">INCORPORATED WORKSTATION PORTAL</p>
            <p className="text-[10px] text-zinc-600">1 INFINITE LOOP, CUPERTINO, CA</p>
            <p className="text-[10px] text-zinc-600">TEL: 408-555-0199</p>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Receipt Meta Details */}
          <div className="text-left text-[10px] space-y-1 my-2">
            <div className="flex justify-between">
              <span>TICKET INDEX:</span>
              <span className="font-extrabold">{order.ticketNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>ORDER REFERENCE:</span>
              <span className="font-extrabold">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span>LEDGER DATE:</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span>CLEAR REGISTER:</span>
              <span>TERM_03_SSL_ACC</span>
            </div>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Items Section */}
          <div className="space-y-1.5 my-3">
            {order.items.map((item, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-extrabold">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500 pl-2">
                  <span>Category: {item.product.category}</span>
                  <span>@ ${item.product.price.toFixed(2)} ea</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Sum details */}
          <div className="text-xs space-y-1 my-2 text-left">
            <div className="flex justify-between text-zinc-600">
              <span>ITEM_SUM:</span>
              <span>${(order.total / 1.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>ACCREDITED_TAX (8.25%):</span>
              <span>${(order.total * 0.0825).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>TRANSPORTATION FEE:</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm border-t border-black pt-1.5 mt-1">
              <span>GRAND SUBTOTAL:</span>
              <span className="bg-black text-white px-1.5">${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Delivery destination Details */}
          <div className="text-left text-[9px] my-2 text-zinc-600 space-y-0.5">
            <span className="font-extrabold text-black block mb-1 text-[10px]">DELIVERY_MANIFEST:</span>
            <p className="font-bold text-black">{order.fullName}</p>
            <p className="line-clamp-2">{order.address}</p>
            <p className="text-black font-semibold mt-1">Pay Method: {order.paymentMethod}</p>
          </div>

          <div className="border-b border-dashed border-black my-2"></div>

          {/* Stylized Barcode exactly as vector mockups on commercial thermal slips */}
          <div className="my-4 flex flex-col items-center justify-center space-y-1.5">
            <div className="flex items-center space-x-[2px] h-10 select-none">
              <span className="w-[3px] h-10 bg-black"></span>
              <span className="w-[1px] h-10 bg-black"></span>
              <span className="w-[4px] h-10 bg-black"></span>
              <span className="w-[2px] h-10 bg-black"></span>
              <span className="w-[1px] h-10 bg-black"></span>
              <span className="w-[3px] h-10 bg-black"></span>
              <span className="w-[2px] h-10 bg-black"></span>
              <span className="w-[4px] h-10 bg-black"></span>
              <span className="w-[1px] h-10 bg-black"></span>
              <span className="w-[2px] h-10 bg-black"></span>
              <span className="w-[3px] h-10 bg-black"></span>
              <span className="w-[2px] h-10 bg-black"></span>
              <span className="w-[4px] h-10 bg-black"></span>
              <span className="w-[1px] h-10 bg-black"></span>
              <span className="w-[3px] h-10 bg-black"></span>
              <span className="w-[2px] h-10 bg-black"></span>
              <span className="w-[1px] h-10 bg-black"></span>
              <span className="w-[4px] h-10 bg-black"></span>
              <span className="w-[3px] h-10 bg-black"></span>
            </div>
            <span className="text-[9px] text-zinc-600 tracking-[0.25em] font-bold">19842026CUPERTINO</span>
          </div>

          {/* Footer message */}
          <div className="text-center text-[10px] uppercase font-bold text-zinc-600 mt-2 space-y-1">
            <p>*** THANK YOU FOR ENRICHING MEMORIES ***</p>
            <p className="text-[8px] text-zinc-400">Keep receipt for vintage warranty validation</p>
          </div>

          {/* Tear detail bottom */}
          <div className="flex justify-between select-none overflow-hidden -mx-6 -mb-6 mt-6 h-3 bg-zinc-300">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="text-[14px] text-amber-50 leading-none -mt-1 font-sans">▼</span>
            ))}
          </div>

        </div>

        {/* Outer Control Buttons for printing/closing */}
        <div className="flex space-x-3">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 border-4 border-black bg-white select-none hover:bg-black hover:text-white text-black font-extrabold uppercase text-xs py-2 px-4 rounded-sm transition-all duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
          >
            <Printer className="h-4 w-4" />
            <span>Print Receipt</span>
          </button>
          
          <button
            onClick={onClose}
            className="border-4 border-black bg-black select-none text-white hover:bg-white hover:text-black font-extrabold uppercase text-xs py-2 px-5 rounded-sm transition-all duration-150 shadow-[4px_4px_0px_0px_rgba(110,110,110,1)]"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
