import { API_ROUTES } from "@/app/common/constant";
import { WatchListApiResponse, StockData } from "@/app/common/types";
import Navbar from "@/app/components/Navabr";
import Autocomplete from "./AddStockForm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export default async function Watchlist() {
  const cookieState = await cookies()
  const tokenVal =  cookieState.get("authToken")?.value || ""
  const stocksApi = await fetch(API_ROUTES.STOCKS_ROUTES.ALL_STOCKS);
  const stocks = await stocksApi.json();

  const watchListApi = await fetch(API_ROUTES.WATCHLIST_ROUTES.GET_WATCHLIST, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: tokenVal
    },
  });
  const watchlist: WatchListApiResponse = await watchListApi.json();

  const addToWatchList = async (stock: StockData) => {
    "use server";

    const res = await fetch(API_ROUTES.WATCHLIST_ROUTES.SAVE_WATCHLIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": tokenVal
      },
      body: JSON.stringify({ "stock_id" : stock._id}),
    });
    const result = await res.json();

    if (result && result.type === "success") {
      revalidatePath(API_ROUTES.WATCHLIST_ROUTES.GET_WATCHLIST)
    } else {
      let errMsg = "Something went wrong";
      if (result && result.message) {
        errMsg = result.message;
      }
    }
   
  }

  const removeFromWatchList = async (data: FormData) => {
    "use server";

    const watchlistId = data.get("watchlist_id"); // Get form field value

    const res = await fetch(API_ROUTES.WATCHLIST_ROUTES.REMOVE_WATCHLIST, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: tokenVal,
      },
      body: JSON.stringify({ watchlist_id: watchlistId }),
    });
    const result = await res.json();

    if (result && result.type === "success") {
      revalidatePath(API_ROUTES.WATCHLIST_ROUTES.GET_WATCHLIST);
    } else {
      let errMsg = "Something went wrong";
      if (result && result.message) {
        errMsg = result.message;
      }
    }
  };

  return (
    <>
      <Navbar username="T" />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md px-25">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">My Watchlist</h1>

        {/* Add Stock Section */}
        <div className="mb-6">
          <Autocomplete stocks={stocks.data} addWatchList={addToWatchList} />
        </div>

        {/* Watchlist Table */}
        {watchlist && watchlist.data && watchlist.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg text-center">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="border-b p-3 border-r border-gray-300">#</th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Stock Name
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Symbol
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Sector
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Market Cap
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Price
                  </th>
                  <th className="border-b p-3 border-r border-gray-300 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {watchlist.data.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 border-b border-gray-300"
                  >
                    <td className="p-3 border-r border-gray-300">
                      {index + 1}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {item.stock.name}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {item.stock.symbol}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {item.stock.sector}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {item.stock.marketCap.toLocaleString()}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      ${item.stock.price.toFixed(2)}
                    </td>
                    <td className="p-3 border-r border-gray-300 text-center">
                      <form action={removeFromWatchList}>
                        <input type="hidden" name="watchlist_id" value={item._id}/>
                        <button type="submit" className="px-3 py-1 text-red-500 hover:underline">
                          Remove
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
}
