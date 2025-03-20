"use client"

import React, {useEffect, useState } from "react";
import Navbar from "../../components/Navabr";
import { getTokenFromCookie } from "@/app/common/server-constant";
import { API_ROUTES, ROUTES } from "@/app/common/constant";
import { useRouter } from "next/navigation";


const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name : "",
    email : "",
    watchlistCount : 0,
    stockPurchasedCount : 0,
  })

  const router = useRouter()

  const goToWatchList = () => {
      router.push(ROUTES.WATCHLIST)
    }
  
  const fetchProfile = async () => {
      const token = await getTokenFromCookie()
      const response = await fetch(API_ROUTES.USER_ROUTES.SHOW_USER_INFO, { headers: { token }})
      const result = await response.json()
      if (result && result.data) {
        const userInfo = {
          name: result.data.name,
          email: result.data.email,
          watchlistCount: result.watchlist_count,
          stockPurchasedCount: 0,
        };
        setUserInfo(userInfo);
      }
    }

  useEffect(() => {
    fetchProfile()
  },[])

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        {/* Account Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Account Summary</h3>
          <div className="mt-4 grid grid-cols-2 gap-6">
            {/* Watchlist */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h4 className="text-gray-800 font-semibold">Watchlist</h4>
              <p className="text-gray-600">{userInfo.watchlistCount} stocks</p>
            </div>
            {/* Stock Purchased */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h4 className="text-gray-800 font-semibold">Stock Purchased</h4>
              <p className="text-gray-600">{userInfo.stockPurchasedCount} stocks</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Actions</h3>
          <div className="mt-4 flex flex-col gap-4">
            <button onClick={goToWatchList} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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
    </div>
  );
};

export default Profile;
