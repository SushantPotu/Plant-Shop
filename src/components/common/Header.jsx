import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';

// cart helpers (localStorage)
 const CART_KEY = 'cart.v1.items';
 const getItems = () => {
   try { return JSON.parse(localStorage.getItem(CART_KEY)) ?? []; }
   catch { return []; }
 };
 const setItems = (items) => {
   localStorage.setItem(CART_KEY, JSON.stringify(items));
   window.dispatchEvent(new Event('cart:updated'));
};
const updateQty = (id, size, qty) => {
  const items = getItems().map(i =>
    i.id === id && (i.size ?? '') === (size ?? '')
      ? { ...i, qty: Math.max(1, qty) }
      : i
  );
  setItems(items);
};
const removeItem = (id, size) => {
  const items = getItems().filter(i => !(i.id === id && (i.size ?? '') === (size ?? '')));
  setItems(items);
};
const getCount = () => getItems().reduce((n, i) => n + (i.qty ?? 1), 0);


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItemsState] = useState(() => getItems());
  const [count, setCount] = useState(() => getCount());
  const panelRef = useRef(null);

  useEffect(() => {
    const refresh = () => {
       setItemsState(getItems());
     setCount(getCount());
    };
    refresh();
    const onCartUpdated = () => refresh();
    const onStorage = (e) => { if (e.key === CART_KEY) refresh(); };
    window.addEventListener('cart:updated', onCartUpdated);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('cart:updated', onCartUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

   // close on outside click / ESC when open
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setCartOpen(false); };
    const onDoc = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setCartOpen(false);
    };
    setTimeout(() => document.addEventListener('mousedown', onDoc), 0);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [cartOpen]);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + (i.price ?? 0) * (i.qty ?? 1), 0),
    [items]
  );

  return (
    <header className="w-full">
      {/* Top Banner */}
      <section className="w-full bg-primary-background">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-start items-center py-[10px] px-[56px] md:px-[148px]">
            <div className="flex flex-row justify-end items-center flex-1">
              <div className="flex flex-row justify-between items-center w-full md:w-[64%] gap-4">
                <p 
                  className="text-base font-semibold leading-lg text-center text-primary-foreground"
                  style={{
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '22px',
                    color: '#ffffff'
                  }}
                >
                  FREE SHIPPING ON ALL FULL SUN PLANTS! FEB. 25–28.
                </p>
                <div className="flex flex-row justify-center items-center w-auto md:w-[16%]">
                  <div className="flex flex-row justify-center items-start w-full">
                    <span 
                      className="text-base font-normal leading-lg text-left text-primary-foreground"
                      style={{
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        color: '#ffffff'
                      }}
                    >
                      USD
                    </span>
                    <div className="flex flex-col gap-[34px] justify-start items-start self-center flex-1 -ml-[16px]">
                      <span 
                        className="self-end text-base font-bold leading-lg text-left text-primary-foreground"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '700',
                          lineHeight: '22px',
                          color: '#ffffff'
                        }}
                      >
                        Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <section className="w-full bg-header-background shadow-[0px_4px_10px_#00000026]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-start items-center py-[6px]">
            <div className="flex flex-row justify-center items-center w-full">
              <div className="flex flex-row justify-between items-center w-full md:w-[89%] px-[86px] md:px-0">
                {/* Logo */}
                <div className="flex items-center">
                  <img 
                    src="/images/img_header_logo.png" 
                    alt="GreenLeaf Plant Shop" 
                    className="w-[195px] h-[23px] mb-[4px]"
                  />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex flex-row justify-between items-center w-[70%]">
                  <div className="flex flex-row justify-center items-center w-auto px-[6px] py-[6px]">
                    <ul className="flex flex-row gap-[86px] justify-center items-center w-auto" role="menubar">
                      <li role="menuitem">
                        <button 
                          className="text-lg font-normal leading-xl text-left text-header-text hover:text-primary-background transition-colors"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '17px',
                            fontWeight: '400',
                            lineHeight: '23px',
                            color: '#000000'
                          }}
                        >
                          Home
                        </button>
                      </li>
                      <li role="menuitem">
                        <button 
                          className="text-lg font-normal leading-xl text-left text-header-text hover:text-primary-background transition-colors"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '17px',
                            fontWeight: '400',
                            lineHeight: '23px',
                            color: '#000000'
                          }}
                        >
                          Products
                        </button>
                      </li>
                      <li role="menuitem">
                        <button 
                          className="text-lg font-normal leading-xl text-left text-header-text hover:text-primary-background transition-colors"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '17px',
                            fontWeight: '400',
                            lineHeight: '23px',
                            color: '#000000'
                          }}
                        >
                          About us
                        </button>
                      </li>
                      <li role="menuitem">
                        <button 
                          className="text-lg font-normal leading-xl text-left text-header-text hover:text-primary-background transition-colors"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '17px',
                            fontWeight: '400',
                            lineHeight: '23px',
                            color: '#000000'
                          }}
                        >
                          Contact us
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Search and Cart */}
                  <div className="flex flex-row justify-between items-center w-[26%]">
                    {/* Search Input */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const query = e.target.search.value;
                        if (query.trim()) {
                          window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                        }
                      }} 
                      className="flex items-center w-full"
                    >
                      <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-background"
                      />
                      <button type="submit" className="ml-2">
                        <img 
                          src="/images/img_search.png" 
                          alt="Search" 
                          className="w-[22px] h-[22px] mr-[60px]" 
                        />
                      </button>
                    </form>

                    {/* Bag */}
                    <button 
                      type="button"
                      onClick={() => setCartOpen((v) => !v)}
                      className="relative flex items-center"
                      aria-label="Open cart"
                    >
                      <img src="/images/bag.svg" alt="Bag" className="w-[18px] h-[20px]" />
                      <span className="ml-2 text-lg font-normal text-header-text">{count}</span>
                    </button>
                  </div>

                  {/* Mini-cart panel */}
                  {cartOpen && (
                    <div
                      ref={panelRef}
                      role="dialog"
                      aria-label="Cart"
                      className="absolute right-6 top-[120px] w-[520px] max-h-[90vh] overflow-auto rounded-2xl shadow-xl border border-gray-200 bg-white z-[1000]"
                    >
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-center"
                         style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "44px",
                          letterSpacing: "-1.5px",}}>Your Cart</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {items.length === 0 && (
                          <p className="text-sm text-gray-500">Your cart is empty.</p>
                        )}
                        {items.map((i) => (
                          <div key={`${i.id}::${i.size ?? ''}`} className="flex items-center gap-3">
                            {i.image ? (
                              <img src={i.image} alt={i.name} className="w-40 h-40 rounded object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded bg-gray-100" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate" style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 500,
                                fontSize: "20px",
                                lineHeight: "44px",
                                letterSpacing: "-1.5px",
                              }}>{i.name}</div>
                              {i.size ? <div className="text-xs text-gray-500" >Size {i.size}</div> : null}
                              <div className="text-lg text-gray-500">${(i.price ?? 0).toFixed(2)}</div>

                              {/* More quantity change controls */}
                              <div className="mt-1 flex items-center gap-2">
                                <button
                                  className="px-2 py-1 border rounded"
                                  onClick={() => updateQty(i.id, i.size, (i.qty ?? 1) - 1)}
                                >
                                  -
                                </button>
                                <span className="text-sm">{i.qty ?? 1}</span>
                                <button
                                  className="px-2 py-1 border rounded"
                                  onClick={() => updateQty(i.id, i.size, (i.qty ?? 1) + 1)}
                                >
                                  +
                                </button>
                                <button
                                  className="ml-2 mr-2 text-m text-red-600 underline"
                                  onClick={() => removeItem(i.id, i.size)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>
                      <div className="p-4 border-t border-gray-150">
                        <div className="flex items-center justify-between text-lg mb-3">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                          <a href="/checkout" className="flex-1 text-center px-3 py-2 rounded-lg bg-[#50806b] text-white">
                            Checkout
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                  className="lg:hidden p-4" 
                  aria-label="Open menu"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden bg-header-background border-t border-gray-200`}>
          <div className="px-4 py-2 space-y-2">
            <button className="block w-full text-left px-4 py-2 text-lg font-normal text-header-text hover:bg-gray-100 rounded">
              Home
            </button>
            <button className="block w-full text-left px-4 py-2 text-lg font-normal text-header-text hover:bg-gray-100 rounded">
              Products
            </button>
            <button className="block w-full text-left px-4 py-2 text-lg font-normal text-header-text hover:bg-gray-100 rounded">
              About us
            </button>
            <button className="block w-full text-left px-4 py-2 text-lg font-normal text-header-text hover:bg-gray-100 rounded">
              Contact us
            </button>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-lg font-normal text-accent-light">Search</span>
              <div className="flex items-center space-x-2">
                <img src="/images/bag.svg" alt="Bag" className="w-[18px] h-[20px]" />
                <span className="text-lg font-normal text-header-text">2</span>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;
