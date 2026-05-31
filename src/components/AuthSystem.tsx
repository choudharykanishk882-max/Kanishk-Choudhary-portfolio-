/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Order } from '../types';
import { KeyRound, Mail, UserCheck, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

interface AuthSystemProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  dbOrders: Order[];
  onOpenReceipt: (order: Order) => void;
}

export const AuthSystem: React.FC<AuthSystemProps> = ({
  currentUser,
  onLogin,
  onLogout,
  dbOrders,
  onOpenReceipt,
}) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // Billing Address details for signup / customization
  const [fullName, setFullName] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');

  // Logs or messages inside terminal style
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[SYS] READY. WAITING FOR OPERATOR ACTION...']);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');

  const addTerminalLog = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
    setFeedbackType(type);
  };

  // Pre-seed some mock user accounts in localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('mac_store_users');
    if (!storedUsers) {
      const defaultUsers = [
        {
          username: 'retro_fan',
          email: 'fan@retro.mac',
          password: 'password123',
          address: {
            fullName: 'Mac Steve',
            street: '1 Infinite Loop',
            city: 'Cupertino',
            zipCode: '95014',
            country: 'United States',
          },
        },
      ];
      localStorage.setItem('mac_store_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || (isRegistering && (!email || !fullName || !street || !city || !zipCode))) {
      addTerminalLog('CRITICAL FAULT: ALL HIGHLIGHTED FIELDS MUST BE DEFINED.', 'error');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('mac_store_users') || '[]');

    if (isRegistering) {
      if (password !== confirmPassword) {
        addTerminalLog('PASSWORD INTEGRITY MISMATCH: CONFIRM FIELD DOES NOT MATCH.', 'error');
        return;
      }

      const userExists = storedUsers.some((u: any) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        addTerminalLog('REGISTRATION CONFLICT: USERNAME OR EMAIL ALREADY IN SYSTEM REGISTRY.', 'error');
        return;
      }

      const newUserPayload = {
        username,
        email,
        password,
        address: {
          fullName,
          street,
          city,
          zipCode,
          country,
        },
      };

      storedUsers.push(newUserPayload);
      localStorage.setItem('mac_store_users', JSON.stringify(storedUsers));
      
      addTerminalLog(`OPERATOR "${username.toUpperCase()}" ENROLLED SUCCESSFULLY. PLEASE LOGIN.`, 'success');
      setIsRegistering(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      // Login flow
      const userMatch = storedUsers.find((u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      
      if (userMatch) {
        onLogin({
          username: userMatch.username,
          email: userMatch.email,
          address: userMatch.address,
          isLoggedIn: true,
        });
        addTerminalLog(`USER "${userMatch.username.toUpperCase()}" SECURE SESSION GRANTED. ACCESS GRANTED.`, 'success');
      } else {
        addTerminalLog('AUTHENTICATION DENIED: UNKNOWN ID OR BAD ACCESS KEY.', 'error');
      }
    }
  };

  // Active User orders
  const userOrders = dbOrders;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Core User Terminal Form */}
      <div className={`col-span-1 ${currentUser ? 'lg:col-span-5' : 'lg:col-span-7'} flex flex-col`}>
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden">
          {/* Custom Window Top Header */}
          <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-4 border-black">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-white border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-white border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-black border border-white inline-block"></span>
            </div>
            <span className="font-mono text-xs font-bold tracking-wider">
              {currentUser ? 'USER_SESSION.CFG' : isRegistering ? 'REGISTER_ACCOUNT.EXE' : 'OPERATOR_LOGIN.EXE'}
            </span>
            <div className="w-12 h-2 border-y border-white"></div>
          </div>

          <div className="p-6">
            {!currentUser ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black font-mono text-xs">
                  <span>INTERFACE_MODE:</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(false);
                        addTerminalLog('SWITCHED INTERFACE MODE: USER LOGIN');
                      }}
                      className={`px-3 py-1 border-2 border-black font-bold uppercase transition-all duration-150 ${!isRegistering ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(true);
                        addTerminalLog('SWITCHED INTERFACE MODE: ENROLLMENT PORTAL');
                      }}
                      className={`px-3 py-1 border-2 border-black font-bold uppercase transition-all duration-150 ${isRegistering ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-sm text-left">
                  {/* Basic Info */}
                  <div>
                    <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Username *</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        @
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="mac_enthusiast"
                        className="w-full border-2 border-black pl-8 pr-3 py-2 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                        required
                      />
                    </div>
                  </div>

                  {isRegistering && (
                    <div>
                      <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="steve@nextstep.com"
                          className="w-full border-2 border-black pl-9 pr-3 py-2 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                          required={isRegistering}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Security Key *</label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border-2 border-black pl-9 pr-3 py-2 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                          required
                        />
                      </div>
                    </div>

                    {isRegistering && (
                      <div>
                        <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Re-enter Key *</label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border-2 border-black pl-9 pr-3 py-2 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                            required={isRegistering}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SHIPPING / REGISTRY ADDRESS FIELDS for Enrollment */}
                  {isRegistering && (
                    <div className="border-t-2 border-black pt-4 mt-2 space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider bg-black text-white px-2 py-1 inline-block">
                        Shipping Registry Address
                      </h4>

                      <div>
                        <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Full Legal Name *</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Steve Wozniak"
                          className="w-full border-2 border-black px-3 py-1.5 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                          required={isRegistering}
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Street Address *</label>
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="2200 University Ave, Ste 4"
                          className="w-full border-2 border-black px-3 py-1.5 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                          required={isRegistering}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold mb-1 uppercase text-xs tracking-wider">City *</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Palo Alto"
                            className="w-full border-2 border-black px-3 py-1.5 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                            required={isRegistering}
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Postal Zip *</label>
                          <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="94301"
                            className="w-full border-2 border-black px-3 py-1.5 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                            required={isRegistering}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1 uppercase text-xs tracking-wider">Country Location *</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full border-2 border-black px-3 py-1.5 focus:ring-0 focus:outline-none bg-white text-black text-xs font-mono"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="Japan">Japan</option>
                          <option value="India">India</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full border-2 border-black bg-white hover:bg-black hover:text-white text-black font-mono font-bold uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all duration-150 transform active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#000]"
                >
                  {isRegistering ? 'Initialize Enrollment' : 'Establish Connection'}
                </button>
              </form>
            ) : (
              // Logged In Status Screen
              <div className="space-y-6 text-left font-mono">
                <div className="flex items-center space-x-3 bg-gray-100 p-4 border-2 border-black">
                  <div className="p-2 border-2 border-black bg-white rounded-full">
                    <UserCheck className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold block">Connected Profile</span>
                    <h3 className="text-lg font-bold">@{currentUser.username}</h3>
                  </div>
                </div>

                {/* Profile details */}
                <div className="space-y-2 border-2 border-black p-4">
                  <h4 className="font-bold text-xs uppercase bg-black text-white px-2 py-0.5 inline-block tracking-wider">
                    REGISTRY_DATA.BIN
                  </h4>
                  <div className="text-xs space-y-1">
                    <p><span className="font-bold text-zinc-500">EMAIL:</span> {currentUser.email}</p>
                    <p><span className="font-bold text-zinc-500">RECIPIENT:</span> {currentUser.address.fullName}</p>
                    <p><span className="font-bold text-zinc-500">DELIVERY_ADDRESS:</span></p>
                    <div className="border border-zinc-200 p-2 bg-gray-50 flex flex-col mt-1">
                      <span>{currentUser.address.street}</span>
                      <span>{currentUser.address.city}, {currentUser.address.zipCode}</span>
                      <span>{currentUser.address.country}</span>
                    </div>
                  </div>
                </div>

                {/* Log Out */}
                <button
                  onClick={() => {
                    onLogout();
                    addTerminalLog('TERMINATED ENCRYPTED OPERATOR SESSION.', 'info');
                  }}
                  className="w-full border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider py-2 transition-all duration-150"
                >
                  Sign Out / Logoff
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Terminal Logs & Active Order Records Panel */}
      <div className={`col-span-1 ${currentUser ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
        <div className="flex flex-col space-y-6">
          {/* Diagnostic Console Panel */}
          <div className="border-4 border-black bg-zinc-900 text-green-400 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm font-mono text-left">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <span className="text-xs font-bold text-zinc-400 uppercase">System Console Logs</span>
              <span className="text-xs px-1 bg-zinc-800 text-zinc-400 rounded">v1.0.1</span>
            </div>

            <div className="space-y-1.5 max-h-[160px] overflow-y-auto text-xs font-mono scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-950">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.includes('CRITICAL') || log.includes('DENIED')
                      ? 'text-red-400'
                      : log.includes('ENROLLED') || log.includes('SESSION')
                      ? 'text-emerald-400'
                      : 'text-zinc-300'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
            
            <div className="border-t border-zinc-800 pt-2 mt-2 flex justify-between items-center text-[10px] text-zinc-500">
              <span>PORT // 3000 // INGRESS</span>
              <span>STATE: SECURITY_SSL_ON</span>
            </div>
          </div>

          {/* User History window (If Logged In) or Tips */}
          {currentUser ? (
            <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden">
              <div className="bg-black text-white px-4 py-1.5 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">ORDER_REGISTRY.DB</span>
                <span className="text-xs text-zinc-400">{userOrders.length} Order(s) Found</span>
              </div>

              <div className="p-4 text-left font-mono">
                {userOrders.length === 0 ? (
                  <div className="p-6 border-2 border-dashed border-zinc-300 text-center text-zinc-400">
                    <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-55 text-black" />
                    <p className="text-xs font-bold uppercase">No Active Order Receipts Configured</p>
                    <p className="text-[11px] mt-1">Acquire devices from the catalog to print transaction certificates.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border-2 border-black p-3 bg-gray-50 flex flex-col justify-between md:flex-row md:items-center gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold bg-black text-white px-1.5 py-0.5 rounded-sm">
                              {order.ticketNumber}
                            </span>
                            <span className="text-xs text-zinc-500 font-bold">{order.date}</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-semibold">{order.items.length} item(s)</span>
                            <span className="text-zinc-400 mx-2">|</span>
                            <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
                          </div>
                          <div className="text-[10px] text-zinc-500 bg-zinc-200 px-1 inline-block uppercase">
                            STATUS: {order.status}
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenReceipt(order)}
                          className="flex items-center space-x-1.5 hover:bg-black hover:text-white text-xs border-2 border-black bg-white px-3 py-1.5 font-bold transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Show Invoice</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border-4 border-black bg-yellow-50 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm text-left font-mono">
              <h4 className="font-bold text-xs uppercase tracking-wider bg-black text-white px-2 py-0.5 inline-block mb-3">
                Operator Credentials Tip
              </h4>
              <p className="text-xs leading-relaxed text-zinc-700">
                To test the secure checkout flow smoothly:
              </p>
              <ul className="text-xs leading-relaxed text-zinc-700 list-disc list-inside mt-2 space-y-1">
                <li>Register a custom key in the <strong>Sign Up</strong> portal, or use:</li>
                <li>Username: <code className="bg-yellow-200 px-1 font-bold">retro_fan</code></li>
                <li>Security Key: <code className="bg-yellow-200 px-1 font-bold">password123</code></li>
                <li>Your delivery address will carry forward automatically to the shipping grid.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
