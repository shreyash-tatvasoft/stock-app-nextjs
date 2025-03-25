import { API_ROUTES } from "@/app/common/constant";
import { getTokenFromCookie } from "@/app/common/server-constant";

export default async function Dashboard()  {

    const getAllCounts = await fetch(
      API_ROUTES.USER_ROUTES.GET_ALL_COUNTS,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: await getTokenFromCookie(),
        },
      }
    );

    const allCount = await getAllCounts.json()

  return (
    <div>
      <div className="p-6 text-4xl text-purple-700 font-bold">
        Welcome To Stocks Management System
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stocks Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-pink-600 shadow-md bg-white-500 text-pink-600">
          <div>
            <h3 className="text-xl font-semibold">Total Stocks</h3>
            <p className="text-3xl font-bold">{allCount.stocks_count}</p>
          </div>
        </div>

        {/* Watchlist Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-green-600 shadow-md bg-white-500 text-green-600">
          <div className="text-4xl mr-4">{/* <FaBook /> */}</div>
          <div>
            <h3 className="text-xl font-semibold">Watchlist </h3>
            <p className="text-3xl font-bold">{allCount.watchlist_count}</p>
          </div>
        </div>

        {/* Stocks Purchased Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-gray-600 shadow-md bg-white-500 text-gray-600">
          <div className="text-4xl mr-4">{/* <FaClipboardList /> */}</div>
          <div>
            <h3 className="text-xl font-semibold">Stocks Purchased</h3>
            <p className="text-3xl font-bold">{allCount.purchased_stock_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
