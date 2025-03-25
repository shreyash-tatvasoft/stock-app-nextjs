"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, ROUTES } from "../common/constant";
import { getTokenFromCookie } from "../common/server-constant";


const Navbar: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to toggle popover
  const [userName, setUsername] =  useState("");
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

  const goToDashboard = () => {
    router.push(ROUTES.STOCK_DASHBOARD)
  }

  const featchProfile = async () => {
    const token = await getTokenFromCookie()
    const response = await fetch(API_ROUTES.USER_ROUTES.SHOW_USER_INFO, { headers: { token }})
    const result = await response.json()
    if(result && result.data) {
        const userName = result.data.name
        const firstLetter = userName.charAt(0).toUpperCase(); // Get the first letter of the username
        setUsername(firstLetter)
    }
  }

  useEffect(() => {
    featchProfile()
  },[])

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
          {userName}
        </button>

        {/* Popover */}
        {isPopoverOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            onMouseLeave={closePopover}
          >
            <div className="flex flex-col">
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
