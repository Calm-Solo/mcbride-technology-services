"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function WebDevelopment() {
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
      <div className="flex-grow flex flex-col items-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center">Web Development Services</h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-10">
          We offer professional web development services tailored to your business needs. 
          Choose from our flexible pricing plans below or contact us for a custom quote.
        </p>
        
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
          {/* Basic Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-transform hover:scale-105">
            <div className="bg-blue-700 p-4 text-center">
              <h2 className="text-2xl font-bold">Basic Website</h2>
              <p className="text-3xl font-bold mt-2">$1,200</p>
              <p className="text-sm opacity-80">One-time payment</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Up to 5 pages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Mobile responsive design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Contact form</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Basic SEO setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Social media integration</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          
          {/* Professional Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-transform hover:scale-105 transform scale-105 md:scale-110 z-10 shadow-xl">
            <div className="bg-blue-600 p-4 text-center relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-blue-900 text-xs font-bold px-2 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <h2 className="text-2xl font-bold">Business Website</h2>
              <p className="text-3xl font-bold mt-2">$2,500</p>
              <p className="text-sm opacity-80">One-time payment</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Up to 10 pages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Advanced responsive design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Content Management System</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Advanced SEO optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Google Analytics integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Blog functionality</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          
          {/* E-commerce Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-transform hover:scale-105">
            <div className="bg-blue-700 p-4 text-center">
              <h2 className="text-2xl font-bold">E-commerce</h2>
              <p className="text-3xl font-bold mt-2">$4,000+</p>
              <p className="text-sm opacity-80">Starting price</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Full e-commerce functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Product management system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Payment gateway integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Inventory management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Customer account system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Order tracking & management</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Maintenance Plans */}
        <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-6 text-center">Website Maintenance Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
          {/* Basic Maintenance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="bg-blue-700 p-4 text-center">
              <h2 className="text-xl font-bold">Basic Maintenance</h2>
              <p className="text-2xl font-bold mt-2">$75<span className="text-lg">/month</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Software updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Security monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Monthly backups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>1 hour of content updates</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Select Plan
                </Link>
              </div>
            </div>
          </div>
          
          {/* Standard Maintenance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="bg-blue-700 p-4 text-center">
              <h2 className="text-xl font-bold">Standard Maintenance</h2>
              <p className="text-2xl font-bold mt-2">$150<span className="text-lg">/month</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>All Basic features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Weekly backups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>3 hours of content updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Monthly analytics report</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Select Plan
                </Link>
              </div>
            </div>
          </div>
          
          {/* Premium Maintenance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="bg-blue-700 p-4 text-center">
              <h2 className="text-xl font-bold">Premium Maintenance</h2>
              <p className="text-2xl font-bold mt-2">$300<span className="text-lg">/month</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>All Standard features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Daily backups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>6 hours of content updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Priority support (24hr response)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>SEO monitoring & updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Conversion optimization</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/contact" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
                  Select Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom Solutions */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-4xl w-full mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Need a Custom Solution?</h2>
          <p className="text-center mb-6">
            Every business has unique requirements. Contact us for a personalized quote tailored to your specific needs.
          </p>
          <div className="text-center">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full p-4 md:p-6 bg-blue-900/50 text-center text-sm md:text-base mt-16">
        <p>© {new Date().getFullYear()} McBride Technology Services. All rights reserved.</p>
      </footer>
    </div>
  );
} 