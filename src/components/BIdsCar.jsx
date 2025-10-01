import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BidsCar = () => {
	const [cars, setCars] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch("http://localhost:8000/api/v1/cars/get-all-cars")
			.then((res) => {
				if (!res.ok) throw new Error(`Request failed: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				console.log("Fetched data:", data);
				const list = Array.isArray(data)
					? data
					: Array.isArray(data?.data)
						? data.data
						: Array.isArray(data?.cars)
							? data.cars
							: Array.isArray(data?.data?.cars)
								? data.data.cars
								: [];
				setCars(list);
				setError("");
			})
			.catch((err) => {
				console.log("Er ror fetching:", err);
				setError(err?.message || "Error fetching data");
			});
	}, []);

	const getImageUrl = (car) => {
		const url = car?.image || car?.thumbnail || car?.images?.[0];
		return typeof url === "string" && url.startsWith("http") ? url : null;
	};

	return (
		<>
			<section id="featured" className="max-w-6xl mx-auto px-4 py-12">
				<div className="flex items-end justify-between">
					<h2 className="text-xl font-semibold">Featured cars</h2>
                    <Link
                        to="/cars"
						className="text-sm text-blue-600 hover:underline"
					>
                        View all cars
					</Link>
				</div>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{error && <p className="text-red-600">{error}</p>}

					{cars.map((car, index) => (
                        <div
							key={car.id || car.lot_id || index}
							className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
						>
							{(() => { const imgUrl = getImageUrl(car); return (
								<div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
									{imgUrl ? (
										<img
											src={imgUrl}
											alt={car.title || car.make || "Car"}
											className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
										/>
									) : (
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-[92%] h-[92%] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
												<span className="text-xs text-gray-500">Car image</span>
											</div>
										</div>
									)}
									<div className="absolute top-2 left-2 flex gap-2">
										<span className="px-2 py-0.5 text-xs rounded bg-white/90 border text-gray-700">{car.status || "Available"}</span>
										{car.location && <span className="px-2 py-0.5 text-xs rounded bg-white/90 border text-gray-700">{car.location}</span>}
									</div>
								</div>
							); })()}

                            <div className="p-4">
                                <h3 className="font-semibold text-lg truncate" title={car.title}>
                                    <Link
                                        to={`/vehicle/${encodeURIComponent(car.id || car.lot_id || index)}`}
                                        className="hover:underline"
                                    >
                                        {car.title || `${car.make || ""} ${car.model || ""}`.trim() || "Untitled"}
                                    </Link>
                                </h3>
								<p className="text-sm text-gray-500 truncate">VIN: {car.vin || "N/A"}</p>

								<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
									<div className="rounded-md bg-gray-50 border p-2">
										<p className="text-gray-500">Type</p>
										<p className="font-medium">{car.vehicle_type || car.body_type || "—"}</p>
									</div>
									<div className="rounded-md bg-gray-50 border p-2">
										<p className="text-gray-500">Color</p>
										<p className="font-medium">{car.color || "—"}</p>
									</div>
									<div className="rounded-md bg-gray-50 border p-2">
										<p className="text-gray-500">Odometer</p>
										<p className="font-medium">{car.odometer || "—"}</p>
									</div>
									<div className="rounded-md bg-gray-50 border p-2">
										<p className="text-gray-500">Engine</p>
										<p className="font-medium">{car.engine || "—"}</p>
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between">
									<div>
										<p className="text-xs text-gray-500">Current Bid</p>
										<p className="text-base font-semibold">{car.currentBid ? `US$ ${car.currentBid}` : "No bids"}</p>
									</div>
									<Link to="/auctions" className="inline-flex items-center rounded-md bg-blue-600 text-white text-sm px-3 py-1.5 hover:bg-blue-700">
										Bid now
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

			</section>
		</>
	);
};

export default BidsCar;
