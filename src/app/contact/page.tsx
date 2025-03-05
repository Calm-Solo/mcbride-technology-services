"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
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

      {/* Contact Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center">Contact Us</h1>
        
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-2xl w-full">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Technology Consultant</h2>
            <p className="text-lg md:text-xl mb-2">Michael McBride</p>
          </div>
          
          <div className="space-y-4 mb-6 md:mb-8">
            <div className="flex items-center">
              <span className="text-xl md:text-2xl mr-3 md:mr-4">📱</span>
              <p className="text-base md:text-xl">(916) 269-7703</p>
            </div>
            
            <div className="flex items-center">
              <span className="text-xl md:text-2xl mr-3 md:mr-4">📧</span>
              <a href="mailto:mdrservices916@gmail.com" className="text-base md:text-xl text-blue-200 hover:text-white transition-colors break-all">
                mdrservices916@gmail.com
              </a>
            </div>
            
            <div className="flex items-center">
              <span className="text-xl md:text-2xl mr-3 md:mr-4">📺</span>
              <a href="https://www.youtube.com/@MDR_Services" target="_blank" rel="noopener noreferrer" 
                 className="text-base md:text-xl text-blue-200 hover:text-white transition-colors">
                YouTube: @MDR_Services
              </a>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 text-center">
            <Link href="/" className="px-5 py-2 md:px-6 md:py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-base md:text-lg font-medium">
              Return to Home
            </Link>
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