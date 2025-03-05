"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Navigation Bar */}
      <nav className="w-full p-4 flex justify-between items-center relative">
        <div className="text-2xl font-bold">McBride Tech</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Home</Link>
          <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Services</button>
          <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">About</button>
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Contact</Link>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg py-2 z-10 md:hidden">
            <Link href="/" className="block px-4 py-2 hover:bg-blue-700 transition-colors">Home</Link>
            <button className="block w-full text-left px-4 py-2 hover:bg-blue-700 transition-colors">Services</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-blue-700 transition-colors">About</button>
            <Link href="/contact" className="block px-4 py-2 hover:bg-blue-700 transition-colors">Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center">Welcome to McBride Technology Services</h1>
        
        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl w-full mt-6 md:mt-8">
          {/* Service Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-32 md:h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl md:text-6xl">🌐</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Web Development</h2>
            <p className="text-blue-100 text-sm md:text-base">Custom websites and web applications tailored to your business needs.</p>
            <div className="mt-4">
              <Link href="/web-development" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-block">
                View Pricing
              </Link>
            </div>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-32 md:h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl md:text-6xl">🔒</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">IT Support</h2>
            <p className="text-blue-100 text-sm md:text-base">Protect your business with our comprehensive security solutions.</p>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-32 md:h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl md:text-6xl">⚙️</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Freelance Engineering</h2>
            <p className="text-blue-100 text-sm md:text-base">Regression testing, automation, and more.</p>
            <div className="mt-4">
              <Link href="/freelance-engineering" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full p-4 md:p-6 bg-blue-900/50 text-center text-sm md:text-base">
        <p>© {new Date().getFullYear()} McBride Technology Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
