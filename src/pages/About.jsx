function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative bg-black/60">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">About BidCars</h1>
            <p className="mt-4 max-w-2xl text-white/85">
              A modern auction experience for car enthusiasts. Discover, bid, and win with
              confidence through a clean interface and clear information.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To make car auctions accessible, transparent, and enjoyable. We believe bidding
              should feel effortless, whether you are a first‑time buyer or a seasoned
              collector.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Our Vision</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Build a trusted marketplace where great vehicles find the right owners, powered
              by intuitive design and a community that loves cars.
            </p>
          </div>
        </div>
      </section>

      {/* Values / Features */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h3 className="text-lg font-semibold">What sets us apart</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center font-medium">1</div>
              <h4 className="mt-4 font-medium">Transparent Listings</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Clean specs, high‑quality photos, and essential details help you bid with
                clarity.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center font-medium">2</div>
              <h4 className="mt-4 font-medium">Simple Bidding</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Intuitive flows and real‑time updates keep you focused on the cars you love.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center font-medium">3</div>
              <h4 className="mt-4 font-medium">Community First</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Built for enthusiasts, with features that highlight stories behind every car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-semibold text-gray-900">24/7</div>
            <div className="mt-1 text-sm text-gray-600">Live Auctions</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-semibold text-gray-900">1000+</div>
            <div className="mt-1 text-sm text-gray-600">Happy Bidders</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-semibold text-gray-900">4.9★</div>
            <div className="mt-1 text-sm text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Team / Imagery */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <img
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2070&auto=format&fit=crop"
              alt="People collaborating around a car design board"
              className="h-72 w-full object-cover rounded-xl"
              loading="lazy"
            />
            <div>
              <h3 className="text-lg font-semibold">Built with care</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                We obsess over details—from typography and spacing to data clarity—so your
                experience stays fast, friendly, and delightful.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700">
                <li>• Responsive design for all devices</li>
                <li>• Accessibility‑minded components</li>
                <li>• Performance‑first approach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 sm:p-12 text-white">
          <h3 className="text-2xl font-semibold">Ready to explore live auctions?</h3>
          <p className="mt-2 text-white/90 max-w-2xl">
            Join the community, track your favorites, and place confident bids today.
          </p>
          <div className="mt-6">
            <a
              href="/auctions"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-indigo-700 font-medium shadow-sm hover:shadow transition"
            >
              Browse Auctions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About


