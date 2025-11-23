'use client'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-rose-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-15 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4 border border-white/20">
            ✨ Luxury Resort Experience
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 drop-shadow-2xl animate-slide-up">
          <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-100 bg-clip-text text-transparent">
            Paradise
          </span>
          <br />
          <span className="bg-gradient-to-r from-rose-200 via-amber-200 to-white bg-clip-text text-transparent">
            Resort
          </span>
        </h1>
        <p className="text-xl md:text-3xl text-white/90 mb-12 drop-shadow-lg font-light animate-fade-in-delay max-w-2xl mx-auto leading-relaxed">
          Your Perfect Escape to Luxury & Tranquility
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
          <button
            onClick={() => {
              document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl text-lg font-bold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Book Your Stay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 shadow-xl"
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}



