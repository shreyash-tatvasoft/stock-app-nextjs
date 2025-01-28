"use client"

import { useState } from "react";

interface Stock {
  id: number;
  name: string;
  symbol: string;
  price: string; // Replace with a number if you fetch real-time data
}

const Watchlist = () => {
  // Sample data (replace with dynamic data)
  const [watchlist, setWatchlist] = useState<Stock[]>([
    { id: 1, name: "Apple Inc.", symbol: "AAPL", price: "$175.12" },
    { id: 2, name: "Microsoft", symbol: "MSFT", price: "$312.45" },
    { id: 3, name: "Tesla", symbol: "TSLA", price: "$188.76" },
  ]);

  const [newStock, setNewStock] = useState("");

  // Add a new stock to the watchlist
  const addStock = () => {
    if (newStock.trim()) {
      setWatchlist((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: newStock,
          symbol: newStock.toUpperCase().slice(0, 4), // Mock symbol
          price: "$0.00", // Placeholder price
        },
      ]);
      setNewStock(""); // Clear input
    }
  };

  // Remove a stock from the watchlist
  const removeStock = (id: number) => {
    setWatchlist((prev) => prev.filter((stock) => stock.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>

      {/* Add Stock */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Enter stock name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addStock}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Watchlist Table */}
      {watchlist.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Stock Name</th>
              <th className="border-b p-2">Symbol</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock, index) => (
              <tr key={stock.id} className="hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{stock.name}</td>
                <td className="p-2">{stock.symbol}</td>
                <td className="p-2">{stock.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeStock(stock.id)}
                    className="px-2 py-1 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
