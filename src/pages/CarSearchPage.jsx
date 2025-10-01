import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function CarSearchPage() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Static filter UI – no interactive state or URL sync

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/v1/cars/get-all-cars')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.cars)
          ? data.cars
          : Array.isArray(data?.data?.cars)
          ? data.data.cars
          : []
        setCars(list)
        setError('')
      })
      .catch((err) => {
        setError(err?.message || 'Error fetching cars')
      })
      .finally(() => setLoading(false))
  }, [])

  // normalize not used for static UI

  const uniqueMakes = useMemo(() => {
    const set = new Set()
    for (const car of cars) {
      const make = (car?.make || '').toString().trim()
      if (make) set.add(make)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [cars])

  const uniqueModels = useMemo(() => {
    const set = new Set()
    for (const car of cars) {
      const model = (car?.model || '').toString().trim()
      if (model) set.add(model)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [cars])

  const filtered = useMemo(() => {
    // Static filters requested: do not filter, just return all cars
    return cars
  }, [cars])

  const getImageUrl = (car) => {
    const url = car?.image || car?.thumbnail || car?.images?.[0]
    return typeof url === 'string' && url.startsWith('http') ? url : null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3">
          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="mt-4 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Auction Type</h3>
                </div>
                <div className="mt-2 space-y-2 text-sm">
                  {['copart', 'iaai'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled
                        checked={false}
                      />
                      <span className="capitalize">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Make</h3>
                </div>
                <input
                  value={''}
                  onChange={() => {}}
                  placeholder="Search make"
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                  disabled
                />
                <div className="mt-2 max-h-56 overflow-auto space-y-2 text-sm pr-2">
                  {uniqueMakes
                    .filter((m) => m.toLowerCase().includes(''))
                    .map((m) => (
                      <label key={m} className="flex items-center gap-2">
                        <input type="checkbox" disabled checked={false} />
                        <span>{m}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Model</h3>
                </div>
                <input
                  value={''}
                  onChange={() => {}}
                  placeholder="Search model"
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                  disabled
                />
                <div className="mt-2 max-h-56 overflow-auto space-y-2 text-sm pr-2">
                  {uniqueModels
                    .filter((m) => m.toLowerCase().includes(''))
                    .map((m) => (
                      <label key={m} className="flex items-center gap-2">
                        <input type="checkbox" disabled checked={false} />
                        <span>{m}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Price</h3>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <input type="number" min="0" value={''} placeholder="Min" className="w-full rounded-md border px-3 py-2 text-sm" disabled />
                  <input type="number" min="0" value={''} placeholder="Max" className="w-full rounded-md border px-3 py-2 text-sm" disabled />
                </div>
              </div>

              <button
                className="w-full rounded-md border px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                disabled
              >
                Reset filters
              </button>
            </div>
          </div>
        </aside>

        <section className="md:col-span-9">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{filtered.length} results</p>
            <div className="hidden md:block w-40" />
          </div>

          <div className="mt-4 space-y-4">
            {loading && <p>Loading cars…</p>}
            {error && !loading && <p className="text-red-600">{error}</p>}

            {!loading && filtered.map((car, index) => (
              <div key={car.id || car.lot_id || index} className="rounded-xl border bg-white p-3">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 sm:col-span-4">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[16/9]">
                      {(() => {
                        const imgUrl = getImageUrl(car)
                        return imgUrl ? (
                          <img src={imgUrl} alt={car.title || car.make || 'Car'} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[92%] h-[92%] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">Car image</span>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-8 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/vehicle/${encodeURIComponent(car.id || car.lot_id || index)}`} className="text-base sm:text-lg font-semibold hover:underline">
                        {car.title || `${car.make || ''} ${car.model || ''}`.trim() || 'Untitled'}
                      </Link>
                      {car.auction && (
                        <span className="ml-1 inline-flex items-center rounded bg-red-500 text-white text-[11px] px-2 py-0.5 uppercase">
                          {String(car.auction).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">VIN:</span> {car.vin || 'N/A'}
                      </div>
                      <div>
                        <span className="text-gray-500">Lot:</span> {car.lot || car.lot_id || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span> {car.status || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span> {car.location || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Mileage:</span> {car.mileage || car.odometer || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Damage:</span> {car.damage || car.primary_damage || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Engine:</span> {car.engine || '—'}
                      </div>
                      <div>
                        <span className="text-gray-500">Color:</span> {car.color || '—'}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Current Bid</p>
                        <p className="text-base font-semibold">{car.currentBid ? `US$ ${car.currentBid}` : 'No bids'}</p>
                      </div>
                      <Link to="/auctions" className="inline-flex items-center rounded-md bg-red-600 text-white text-sm px-3 py-2 hover:bg-red-700">
                        Bidding Over
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CarSearchPage


