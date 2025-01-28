"use client"

import React from "react";

const Profile = () => {
  const user = {
    avatar: "https://via.placeholder.com/100", // Replace with dynamic avatar URL
    name: "John Doe",
    email: "john.doe@example.com",
    watchlistCount: 5,
    stockPurchasedCount: 15,
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Account Summary */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Account Summary</h3>
        <div className="mt-4 grid grid-cols-2 gap-6">
          {/* Watchlist */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-gray-800 font-semibold">Watchlist</h4>
            <p className="text-gray-600">{user.watchlistCount} stocks</p>
          </div>
          {/* Stock Purchased */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-gray-800 font-semibold">Stock Purchased</h4>
            <p className="text-gray-600">{user.stockPurchasedCount} stocks</p>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Actions</h3>
        <div className="mt-4 flex flex-col gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Manage Watchlist
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Check Portfolio
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
