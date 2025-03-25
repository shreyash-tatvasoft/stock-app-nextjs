import { SortableComponentProps } from "@/app/common/types"

const SortComponent : React.FC<SortableComponentProps> = ({ submitHandler, sortableKey, orderFormat, currentSortingKey}) => {
  return (
    <div>
      <form action={submitHandler}>
        <input type="hidden" name={"order"} value={orderFormat} />
        <input type="hidden" name={"sortBykey"} value={sortableKey} />
        <button type="submit" className="cursor-pointer text-3xl">
          {currentSortingKey === sortableKey ? (orderFormat === "asc" ? "↑" : "↓") : "↑"}
        </button>
      </form>
    </div>
  );
}

export default SortComponent