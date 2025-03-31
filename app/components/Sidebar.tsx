"use client";
import Link from "next/link";
import { ROUTES } from "../common/constant";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();

  const menuItems = [
    { name: "Dashboard", path: `${ROUTES.DASHBOARD}` },
    { name: "Available Stocks", path: `${ROUTES.STOCK_DASHBOARD}` },
    { name: "My Watchlists", path: `${ROUTES.WATCHLIST}` },
  ];

  return (
    <div className="h-screen w-full max-h-full bg-gray-800 text-white p-5 font-semibold">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link href={item.path} legacyBehavior>
                <h3
                  className={`block p-3 rounded-lg cursor-pointer ${item.path === pathName
                      ? "bg-blue-500"
                      :"hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
