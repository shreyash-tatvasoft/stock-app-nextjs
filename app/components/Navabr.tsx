"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, ROUTES } from "../common/constant";


interface NavbarProps {
  username: string; // Pass the user's name as a prop
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to toggle popover
  const firstLetter = username.charAt(0).toUpperCase(); // Get the first letter of the username
  const router = useRouter()

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const logout = async () => {
    const result = await fetch(API_ROUTES.USER_ROUTES.LOGOUT, { method: "POST" });
    const response = await result.json()
    if(response && response.message) {
      router.push(ROUTES.LOGIN)
    }
  }

  const goToProfile = () => {
    router.push(ROUTES.PROFILE)
  }

  const goToWatchList = () => {
    router.push(ROUTES.WATCHLIST)
  }

  const goToDashboard = () => {
    router.push(ROUTES.STOCK_DASHBOARD)
  }

  return (
    <nav className="bg-gray-800 px-12 py-4 flex items-center justify-between shadow-lg relative">
      {/* Title */}
      <h1 className="text-2xl text-white font-semibold cursor-pointer" onClick={goToDashboard}>Stock App</h1>

      {/* Avatar */}
      <div className="relative">
        <button
          onClick={togglePopover}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600"
        >
          {firstLetter}
        </button>

        {/* Popover */}
        {isPopoverOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            onMouseLeave={closePopover}
          >
            <div className="flex flex-col">
                {/* Profile */}
              <button
                onClick={goToProfile}
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                👤 Profile
              </button>
              {/* Watchlist */}
              <button
                onClick={goToWatchList}
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                📋 Watchlist
              </button>
              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
