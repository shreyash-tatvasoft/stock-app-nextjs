"use client"
import { StockData } from "@/app/common/types";
import React, { useState } from "react";

interface AutocompleteProps {
  stocks: StockData[];
  addWatchList: (stock_id: StockData) => Promise<void>
}

const Autocomplete: React.FC<AutocompleteProps> = ({ stocks, addWatchList }) => {
  const [query, setQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>(stocks);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    const filtered = stocks.filter((stock) =>
      stock.name.toLowerCase().includes(query.toLowerCase())
    );

    if(filtered.length > 0 && query.trim() !== "") {
        setIsDropdownVisible(true);
        setFilteredStocks(filtered);
    } else {
        setIsDropdownVisible(false);
        setSelectedStock(null)
    }
  };

  const handleSelect = (stock: StockData) => {
    setSelectedStock(stock);
    setQuery(stock.name); // Set the input field to selected stock name
    setIsDropdownVisible(false);
  };

  const addToWatchList = async () => {
    if(selectedStock) {
        addWatchList(selectedStock)
        setQuery(""); // Clear input after adding the stock
        setSelectedStock(null); // Clear selected stock
        return false
    }

  };

  return (
    <div className="flex w-full items-center gap-4">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for stock..."
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isDropdownVisible && filteredStocks.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-400 mt-1 max-h-48 overflow-y-auto">
            <ul>
              {filteredStocks.slice(0, 5).map((stock) => (
                <li
                  key={stock._id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(stock)}
                >
                  {stock.name} ({stock.symbol})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={addToWatchList}
        disabled={selectedStock === null}
        className="w-fit px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border border-blue-700"
      >
        Add
      </button>
    </div>
  );
};

export default Autocomplete;
