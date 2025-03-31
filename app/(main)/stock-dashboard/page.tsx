import Navbar from "@/app/components/Navabr";
import moment from "moment";
import { Stock } from "@/app/common/types";
import { API_ROUTES, ROUTES } from "@/app/common/constant";
import Pagination from "@/app/components/Pagination";
import { redirect } from "next/navigation";
import Searchform from "./Searchform";
import SortComponent from "./SortComponent";

export default async function Stocks({
  searchParams,
}: {
  searchParams: { page?: string; query?: string, order? : string, sortBy?: string };
}) {
  const { page, query, order, sortBy } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const perPage = 5;
  const searchVal = query ? query : "";
  const orderBy = order ? order :"asc";
  const sortByKeys = sortBy ? sortBy : "name";

  const res = await fetch(
    `${API_ROUTES.STOCKS_ROUTES.GET_STOCKS}?page=${currentPage}&per_page=${perPage}&query=${searchVal}&order=${orderBy}&sortBy=${sortByKeys}`
  );
  const stocks = await res.json();

  const pageChange = async (page: number) => {
    "use server";
    let params = `page=${page}&order=${orderBy}&sortBy=${sortByKeys}`;

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

  const sortingByOrder = async (formData : FormData) => {
    "use server";
    const orderReceived = formData.get("order") as string
    const sortBykey = formData.get("sortBykey") as string

    const orderToPass = orderReceived === "asc" ? "desc" : "asc"

    let params = `page=${currentPage}&sortBy=${sortBykey}&order=${orderToPass}`

    if (searchVal !== "") {
      params += `&query=${searchVal}`;
    }

    redirect(`${ROUTES.STOCK_DASHBOARD}?${params}`);
  }

  return (
    <div>
      {/* <Navbar /> */}

      <div className="m-20 p-6 bg-white rounded-lg shadow-md px-25">
        <h1 className="text-2xl font-bold mb-4 text-center">Stocks</h1>

        <Searchform
          handleSubmit={searchQuery}
          handleClearSearch={clearSearchQuery}
          initialQueryValue={searchVal}
        />

        {/* Table */}
        {stocks && stocks.data && stocks.data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg text-center">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="border-b p-3 border-r border-gray-300">#</th>
                  <th className="border-b p-3 border-r border-gray-300">
                    <div className="flex gap-2 justify-center items-center">
                      <div>Stock Name</div>
                      <SortComponent
                        submitHandler={sortingByOrder}
                        sortableKey="name"
                        currentSortingKey={sortByKeys}
                        orderFormat={orderBy}
                      />
                    </div>
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    Symbol
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    <div className="flex gap-2 justify-center items-center">
                      <div>Sector</div>
                      <SortComponent
                        submitHandler={sortingByOrder}
                        sortableKey="sector"
                        currentSortingKey={sortByKeys}
                        orderFormat={orderBy}
                      />
                    </div>
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    <div className="flex gap-2 justify-center items-center">
                      <div>Market Cap</div>
                      <SortComponent
                        submitHandler={sortingByOrder}
                        sortableKey="marketCap"
                        currentSortingKey={sortByKeys}
                        orderFormat={orderBy}
                      />
                    </div>
                  </th>
                  <th className="border-b p-3 border-r border-gray-300">
                    <div className="flex gap-2 justify-center items-center">
                      <div>Price</div>
                      <SortComponent
                        submitHandler={sortingByOrder}
                        sortableKey="price"
                        currentSortingKey={sortByKeys}
                        orderFormat={orderBy}
                      />
                    </div>
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
