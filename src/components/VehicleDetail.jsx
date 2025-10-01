import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCarByLotId } from "../api/api";
import Profile from "../pages/Profile";

function VehicleDetail() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await getCarByLotId(carId);
        setCar(response.data);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError(err.message || 'Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/cars" className="text-sm text-blue-600 hover:underline">← Back to categories</Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading vehicle details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/cars" className="text-sm text-blue-600 hover:underline">← Back to categories</Link>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
          <div className="text-red-600 mb-2">⚠️ Error loading vehicle</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/cars" className="text-sm text-blue-600 hover:underline">← Back to categories</Link>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
          <div className="text-gray-500 mb-2">🚗 Vehicle not found</div>
          <p className="text-gray-600">The requested vehicle could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/cars" className="text-sm text-blue-600 hover:underline">← Back to categories</Link>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h1 className="text-2xl font-semibold">Vehicle #{car.lot_id}</h1>
          <p className="text-gray-600">{car.title}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{car.status}</span>
            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">{car.auction_type}</span>
            {car.is_buynow && <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">Buy Now</span>}
          </div>
        </div>
        
        <div className="p-5 grid lg:grid-cols-3 gap-6">
          {/* Main Image Gallery */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              {car.link_img_hd?.[0] ? (
                <img 
                  src={car.link_img_hd[0]} 
                  alt={car.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-[92%] h-[92%] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-sm text-gray-500">Vehicle Image</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {car.link_img_hd && car.link_img_hd.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.link_img_hd.slice(1, 5).map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                    <img src={img} alt={`${car.title} - Image ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {car.link_img_hd.length > 5 && (
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">+{car.link_img_hd.length - 5} more</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Vehicle Information */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Vehicle Details</h3>
              <div className="space-y-2">
                <InfoRow label="Make" value={car.make} />
                <InfoRow label="Model" value={car.model} />
                <InfoRow label="Series" value={car.series} />
                <InfoRow label="Year" value={car.year} />
                <InfoRow label="VIN" value={car.vin} />
                <InfoRow label="Color" value={car.color} />
                <InfoRow label="Engine" value={car.engine} />
                <InfoRow label="Transmission" value={car.transmission} />
                <InfoRow label="Drive" value={car.drive} />
                <InfoRow label="Fuel" value={car.fuel} />
                <InfoRow label="Odometer" value={`${car.odometer?.toLocaleString()} miles`} />
                <InfoRow label="Keys" value={car.keys} />
                <InfoRow label="Document" value={car.document} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Auction Information</h3>
              <div className="space-y-2">
                <InfoRow label="Auction Date" value={car.auction_date ? new Date(car.auction_date).toLocaleDateString() : 'N/A'} />
                <InfoRow label="Location" value={car.location} />
                <InfoRow label="Current Bid" value={car.current_bid ? `$${car.current_bid.toLocaleString()}` : 'No bids'} />
                <InfoRow label="Reserve Price" value={car.price_reserve ? `$${car.price_reserve.toLocaleString()}` : 'N/A'} />
                <InfoRow label="Buy Now Price" value={car.price_future ? `$${car.price_future.toLocaleString()}` : 'N/A'} />
                <InfoRow label="Estimated Price" value={car.estimatedPrice} />
                <InfoRow label="Price Range" value={car.estimatedPricesRange} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Condition & Damage</h3>
              <div className="space-y-2">
                <InfoRow label="Primary Damage" value={car.damage_pr} />
                <InfoRow label="Secondary Damage" value={car.damage_sec} />
                <InfoRow label="Repair Cost" value={car.cost_repair ? `$${car.cost_repair.toLocaleString()}` : 'N/A'} />
                <InfoRow label="Cost Priced" value={car.cost_priced ? `$${car.cost_priced.toLocaleString()}` : 'N/A'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Profile />
      </div>
    </div>
  );
}
function InfoRow({ label, value }) {
  const display = value === null || value === undefined || value === '' ? '—' : String(value);
  return (
    <div className="flex items-center justify-between gap-6 border-b last:border-b-0 py-2">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">{display}</span>
    </div>
  );
}

export default VehicleDetail;


