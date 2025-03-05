import Link from 'next/link';

export default function Home() {
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

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-bold mb-8 text-center">Welcome to McBride Technology Services</h1>
        
        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-8">
          {/* Service Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">🌐</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Web Development</h2>
            <p className="text-blue-100">Custom websites and web applications tailored to your business needs.</p>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">IT Support</h2>
            <p className="text-blue-100">Protect your business with our comprehensive security solutions.</p>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
            <div className="h-40 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Freelance Engineering</h2>
            <p className="text-blue-100">Regression testing, automation, and more.</p>
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
