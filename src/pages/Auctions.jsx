function Auctions() {
  const items = [
    { id: 1, title: '2017 Mercedes C-Class', endsIn: '4h 12m', price: '$12,400' },
    { id: 2, title: '2021 Toyota Corolla', endsIn: '1d 2h', price: '$9,800' },
    { id: 3, title: '2016 Ford Mustang', endsIn: '2d 6h', price: '$18,150' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold">Live auctions</h1>
      <div className="mt-6 divide-y border rounded-lg bg-white">
        {items.map((car) => (
          <div key={car.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{car.title}</p>
              <p className="text-sm text-gray-600">Ends in {car.endsIn}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Current bid: {car.price}</span>
              <button className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Bid</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Auctions


