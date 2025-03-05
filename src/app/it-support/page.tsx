"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function ITSupport() {
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
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center">IT Support Services</h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-10">
          Professional IT support for businesses and individuals. From hardware setup to data recovery, we&apos;ve got you covered.
        </p>
        
        {/* Hero Banner */}
        <div className="bg-blue-700/30 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Reliable Technology Solutions</h2>
          <p className="text-center mb-6">
            Fast, friendly, and professional IT support when you need it most. No technical problem is too big or too small.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full mb-12">
          {/* Service 1 - Hardware Setup */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🖨️</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Printer Setup & Troubleshooting</h3>
            <p className="text-blue-100 mb-4">
              Get your printers connected and working properly across all your devices. We handle:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-100">
              <li>Printer installation and configuration</li>
              <li>Wireless printer setup</li>
              <li>Driver installation and updates</li>
              <li>Print queue management</li>
              <li>Troubleshooting connectivity issues</li>
              <li>Print quality optimization</li>
            </ul>
          </div>
          
          {/* Service 2 - WiFi Configuration */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📶</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">WiFi Configuration & Optimization</h3>
            <p className="text-blue-100 mb-4">
              Ensure fast, reliable, and secure wireless connectivity throughout your home or office:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-100">
              <li>Router setup and configuration</li>
              <li>WiFi network security implementation</li>
              <li>Signal strength optimization</li>
              <li>Dead zone elimination</li>
              <li>Mesh network setup</li>
              <li>Guest network configuration</li>
              <li>Bandwidth management</li>
            </ul>
          </div>
          
          {/* Service 3 - Data Recovery */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">💾</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Data Recovery Services</h3>
            <p className="text-blue-100 mb-4">
              Don&apos;t panic when you lose important data. Our recovery services can help retrieve lost files from:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-100">
              <li>USB flash drives</li>
              <li>External hard drives</li>
              <li>Micro SD cards</li>
              <li>Memory cards</li>
              <li>Accidentally deleted files</li>
              <li>Formatted drives</li>
              <li>Corrupted storage media</li>
            </ul>
          </div>
          
          {/* Service 4 - Computer Setup */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">💻</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Computer Setup & Maintenance</h3>
            <p className="text-blue-100 mb-4">
              Get your new computer set up properly or keep your existing system running smoothly:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-blue-100">
              <li>New computer setup and data migration</li>
              <li>Software installation and configuration</li>
              <li>System optimization for better performance</li>
              <li>Virus and malware removal</li>
              <li>Regular maintenance and updates</li>
              <li>Hardware upgrades and repairs</li>
            </ul>
          </div>
        </div>
        
        {/* Additional Services */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Additional IT Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Network Security</h3>
              <p className="text-sm text-blue-100">Protect your data with robust security solutions including firewall setup and VPN configuration.</p>
            </div>
            
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Smart Home Setup</h3>
              <p className="text-sm text-blue-100">Configure and integrate your smart home devices for seamless automation and control.</p>
            </div>
            
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Cloud Solutions</h3>
              <p className="text-sm text-blue-100">Set up and manage cloud storage, backup solutions, and productivity tools.</p>
            </div>
            
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Email Configuration</h3>
              <p className="text-sm text-blue-100">Setup and troubleshoot email accounts across all your devices and platforms.</p>
            </div>
            
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Remote Support</h3>
              <p className="text-sm text-blue-100">Get help without leaving your home or office with our secure remote support options.</p>
            </div>
            
            <div className="p-4 bg-blue-700/20 rounded-lg">
              <h3 className="font-bold mb-2 text-center">Tech Training</h3>
              <p className="text-sm text-blue-100">Learn how to use your technology more effectively with personalized training sessions.</p>
            </div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Simple, Transparent Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-center">Hourly Rate</h3>
              <p className="text-3xl font-bold text-center mb-2">$75<span className="text-lg">/hour</span></p>
              <p className="text-center text-blue-100 mb-4">For one-time services and quick fixes</p>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>No minimum hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>No travel fees (within 20 miles)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Remote support available</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-700/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-center">Monthly Support</h3>
              <p className="text-3xl font-bold text-center mb-2">$250<span className="text-lg">/month</span></p>
              <p className="text-center text-blue-100 mb-4">For ongoing support and maintenance</p>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Up to 5 hours of support per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Priority response time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Monthly system health check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Discounted hourly rate for additional hours</span>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-center mt-6 text-blue-100">
            Need a custom solution? Contact us for a personalized quote tailored to your specific needs.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="bg-blue-700/40 backdrop-blur-sm p-8 rounded-xl max-w-4xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Solve Your IT Problems?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your IT support needs and get fast, professional help with all your technology challenges.
          </p>
          <Link href="/contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors text-lg font-medium">
            Get Support Now
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full p-4 md:p-6 bg-blue-900/50 text-center text-sm md:text-base mt-16">
        <p>© {new Date().getFullYear()} McBride Technology Services. All rights reserved.</p>
      </footer>
    </div>
  );
} 