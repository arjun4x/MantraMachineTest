import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white py-16 px-4 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent mb-4">
              Paradise Resort
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your perfect escape to luxury and tranquility. Experience world-class hospitality in a stunning natural setting.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Twitter"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
                aria-label="LinkedIn"
              >
                <span className="text-lg">💼</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-teal-300 mt-1">📍</span>
                <span>123 Resort Boulevard, Paradise Island</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-teal-300">📞</span>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-teal-300">✉️</span>
                <a href="mailto:info@paradiseresort.com" className="hover:text-white transition-colors">info@paradiseresort.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-teal-300">🕒</span>
                <span>Open 24/7</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#booking-form" className="hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Book Your Stay
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  View Gallery
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Paradise Resort. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

