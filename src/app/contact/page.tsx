import Link from 'next/link';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Navigation Bar */}
      <nav className="w-full p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">McBride Tech</div>
        <div className="flex space-x-4">
          <Link href="/" className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Home</Link>
          <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Services</button>
          <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">About</button>
          <Link href="/contact" className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Contact Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-bold mb-12 text-center">Contact Us</h1>
        
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl max-w-2xl w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Technology Consultant</h2>
            <p className="text-xl mb-2">Michael McBride</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="text-2xl mr-4">📱</span>
              <p className="text-xl">(916) 269-7703</p>
            </div>
            
            <div className="flex items-center">
              <span className="text-2xl mr-4">📧</span>
              <a href="mailto:mdrservices916@gmail.com" className="text-xl text-blue-200 hover:text-white transition-colors">
                mdrservices916@gmail.com
              </a>
            </div>
            
            <div className="flex items-center">
              <span className="text-2xl mr-4">📺</span>
              <a href="https://www.youtube.com/@MDR_Services" target="_blank" rel="noopener noreferrer" 
                 className="text-xl text-blue-200 hover:text-white transition-colors">
                YouTube: @MDR_Services
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-lg font-medium">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full p-6 bg-blue-900/50 text-center">
        <p>© {new Date().getFullYear()} McBride Technology Services. All rights reserved.</p>
      </footer>
    </div>
  );
} 