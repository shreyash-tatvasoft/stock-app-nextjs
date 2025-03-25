import Navbar from "@/app/components/Navabr";
import moment from "moment";
import { Stock } from "@/app/common/types";
import { API_ROUTES, ROUTES } from "@/app/common/constant";
import Pagination from "@/app/components/Pagination";
import { redirect } from "next/navigation";
import Searchform from "./Searchform";

export default async function Stocks({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  const { page, query } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const perPage = 5;
  const searchVal = query ? query : "";

  const res = await fetch(
    `${API_ROUTES.STOCKS_ROUTES.GET_STOCKS}?page=${currentPage}&per_page=${perPage}&query=${searchVal}`
  );
  const stocks = await res.json();

  const pageChange = async (page: number) => {
    "use server";
    let params = `page=${page}`;

    if (searchVal !== "") {
      params += `&query=${searchVal}`;
    }
    redirect(`${ROUTES.STOCK_DASHBOARD}?${params}`);
  };

  const searchQuery = async (query: string) => {
    "use server";
    redirect(`${ROUTES.STOCK_DASHBOARD}?page=${1}&query=${query}`);
  };

  const clearSearchQuery = async () => {
    "use server";
    redirect(`${ROUTES.STOCK_DASHBOARD}`);
  };

  return (
    <div>
      {/* <Navbar /> */}

      <div className="m-20 p-6 bg-white rounded-lg shadow-md px-25">

        <h1 className="text-2xl font-bold mb-4 text-center">Stocks</h1>

        <Searchform
          handleSubmit={searchQuery}
          handleClearSearch={clearSearchQuery}
        />

        {/* Table */}
        {stocks && stocks.data && stocks.data.length > 0 && (
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
                {stocks.data.map((stock: Stock, index: number) => (
                  <tr
                    key={stock._id}
                    className="hover:bg-gray-50 border-b border-gray-300"
                  >
                    <td className="p-3 border-r border-gray-300">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {stock.name}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {stock.symbol}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {stock.sector}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      {stock.marketCap.toLocaleString()}
                    </td>
                    <td className="p-3 border-r border-gray-300">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td className="p-3 border-r border-gray-300 text-center">
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {stocks && stocks.data && stocks.data.length > 0 && (
          <Pagination
            currentPage={stocks.page}
            itemsPerPage={perPage}
            totalItems={stocks.totalItems}
            onPageChange={pageChange}
          />
        )}

        {stocks && stocks.type && stocks.type === "error" && (
          <div className="mt-4 text-center text-orange-800 font-bold text-2xl">
            No data available
          </div>
        )}
        
      </div>
    </div>
  );
}
