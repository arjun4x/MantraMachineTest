import { images } from "@/app/utils/variables"

export default function Gallery() {


  return (
    <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-teal-50/20 via-white to-rose-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-4">
            Visual Experience
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the beauty and elegance of our resort through stunning visuals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 aspect-[4/3]"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold mb-2 w-fit border border-white/30">
                  {image.category}
                </span>
                <p className="text-white font-bold text-xl drop-shadow-lg">
                  {image.alt}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



