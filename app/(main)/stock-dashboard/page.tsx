import Navbar from "@/app/components/Navabr";
import moment from "moment";
import { Stock } from "@/app/common/types";
import { API_ROUTES, ROUTES } from "@/app/common/constant";
import Pagination from "@/app/components/Pagination";
import { redirect } from "next/navigation";

export default async function Stocks({ searchParams }: { searchParams: { page?: string} }) {
  const { page} = await searchParams 
  const currentPage = page ? parseInt(page, 10) : 1;
   const perPage = 6;

    const res = await fetch(`${API_ROUTES.STOCKS_ROUTES.GET_STOCKS}?page=${currentPage}&per_page=${perPage}`);
    const stocks = await res.json();

    const pageChange = async (page : number) => {
      "use server"
      redirect(`${ROUTES.STOCK_DASHBOARD}?page=${page}`)
    }

    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Stocks</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks &&
              stocks.data &&
              stocks.data.length > 0 &&
              stocks.data.map((stock: Stock) => (
                <div
                  key={stock._id}
                  className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {stock.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {stock.symbol} • {stock.sector}
                  </p>
                  <div className="mt-3">
                    <p className="text-gray-700">
                      <span className="font-semibold">Market Cap:</span>{" "}
                      {stock.marketCap.toLocaleString()}
                    </p>
                    <p className="text-green-600 font-bold text-lg mt-1">
                      ${stock.price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Updated:{" "}
                      {moment(stock.updatedAt).format("Do MMM YYYY h:mm A")}
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      Add to Watchlist
                    </button>
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Pagination 
           currentPage={stocks.page}
           itemsPerPage={perPage}
           totalItems={stocks.totalItems}
           onPageChange={pageChange}
        />
      </div>
    );
  }