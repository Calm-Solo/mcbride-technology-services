"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function FreelanceEngineering() {
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
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center">Freelance Engineering Services</h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-10">
          Flexible technology solutions for businesses of all sizes. Get the expertise you need, when you need it, without the overhead of a full-time hire.
        </p>
        
        {/* Hero Banner */}
        <div className="bg-blue-700/30 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Why Choose McBride Technology Services?</h2>
          <p className="text-center mb-6">
            Save up to 40% compared to traditional staffing agencies while getting access to specialized technical expertise exactly when you need it.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mb-12">
          {/* Service 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Short-Term Technology Staffing</h3>
            <p className="text-blue-100">
              Need a technology professional for a week or more? Get immediate access to skilled engineers without the lengthy hiring process or long-term commitment.
            </p>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Process Automation</h3>
            <p className="text-blue-100">
              Streamline your business operations by automating repetitive tasks. We identify inefficiencies and implement custom automation solutions that save time and reduce errors.
            </p>
          </div>
          
          {/* Service 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🧪</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Product Regression Testing</h3>
            <p className="text-blue-100">
              Ensure your software remains stable with comprehensive regression testing. We identify bugs before they reach your customers, maintaining product quality through every update.
            </p>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Benefits of Freelance Engineering</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cost-Effective</h3>
                <p className="text-blue-100">
                  Save on recruitment costs, benefits, training, and overhead. Pay only for the hours you need, with no long-term commitments or contracts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Immediate Availability</h3>
                <p className="text-blue-100">
                  Skip the lengthy hiring process. Get an experienced engineer working on your project within days, not weeks or months.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Flexibility</h3>
                <p className="text-blue-100">
                  Scale up or down based on your project needs. Bring in specialized expertise for specific projects without restructuring your team.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Specialized Expertise</h3>
                <p className="text-blue-100">
                  Access specialized skills that might be difficult to find or too expensive to maintain in-house full-time.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison with Temp Agencies */}
        <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-5xl w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Us Over Temp Agencies?</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-400/30">
                  <th className="text-left p-3">Feature</th>
                  <th className="text-center p-3">McBride Tech</th>
                  <th className="text-center p-3">Temp Agencies</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-400/30">
                  <td className="p-3">Direct Communication</td>
                  <td className="text-center p-3 text-green-400">✓</td>
                  <td className="text-center p-3 text-red-400">✗</td>
                </tr>
                <tr className="border-b border-blue-400/30">
                  <td className="p-3">Technical Expertise</td>
                  <td className="text-center p-3 text-green-400">Specialized</td>
                  <td className="text-center p-3 text-yellow-400">General</td>
                </tr>
                <tr className="border-b border-blue-400/30">
                  <td className="p-3">Markup</td>
                  <td className="text-center p-3 text-green-400">15-20%</td>
                  <td className="text-center p-3 text-red-400">40-100%</td>
                </tr>
                <tr className="border-b border-blue-400/30">
                  <td className="p-3">Minimum Commitment</td>
                  <td className="text-center p-3 text-green-400">Flexible</td>
                  <td className="text-center p-3 text-red-400">Often 3+ months</td>
                </tr>
                <tr className="border-b border-blue-400/30">
                  <td className="p-3">Screening Process</td>
                  <td className="text-center p-3 text-green-400">Technical focus</td>
                  <td className="text-center p-3 text-yellow-400">General skills</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-blue-700/40 backdrop-blur-sm p-8 rounded-xl max-w-4xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Boost Your Technical Capabilities?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your project needs and discover how our freelance engineering services can help your business thrive.
          </p>
          <Link href="/contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block transition-colors text-lg font-medium">
            Get in Touch
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