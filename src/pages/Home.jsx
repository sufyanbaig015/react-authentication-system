import { Link } from 'react-router-dom'
import BIdsCar from '../components/BIdsCar'

function Card({ title, subtitle, img }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <Link to="/auctions" className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">View</Link>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div>
      <section
        className="relative border-b min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dvkl41t5v/image/upload/v1754593773/web-hero_hkwzwj.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20 text-white flex items-center min-h-[calc(100vh-4rem)]">
          <div className="max-w-2xl rounded-xl border border-white/0 bg-transparent backdrop-blur-0 p-6 sm:p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Premium BMW Collection
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              Discover the latest BMW modelsok
            </h1>
            <p className="mt-4 text-white/90 text-base sm:text-lg leading-relaxed drop-shadow">
              Find iconic performance and luxury. Explore live auctions and place confident bids.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#featured" aria-label="Browse Featured Cars" className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-center">
                Browse Featured
              </a>
              <Link to="/auctions" aria-label="View All Auctions" className="px-5 py-2.5 rounded-md bg-white/90 text-gray-900 hover:bg-white text-center">
                All Auctions
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs sm:text-sm text-white/80">
              <div className="rounded-md border border-white/15 bg-white/10 py-2">M Series</div>
              <div className="rounded-md border border-white/15 bg-white/10 py-2">Hybrid</div>
              <div className="rounded-md border border-white/15 bg-white/10 py-2">Electric</div>
            </div>
            <div className="mt-8 hidden sm:flex items-center gap-2 text-white/70 text-xs">
              <span className="inline-block h-[1px] w-6 bg-white/40" />
              Scroll to explore
            </div>
          </div>
        </div>
      </section>
      <BIdsCar/>
    </div>
  )
}

export default Home


