import { SearchInput } from "@/components/search-input";
import { StatusInput } from "@/components/status-input";

export function Filters() {
  return (
    <div className="pt-6 pb-4 flex gap-4 items-end">
      <div className="flex-1 max-w-[400px]">
        <label
          htmlFor="search-input"
          className="block font-mono text-sm font-semibold mb-1.5 dark:text-gray-300 text-gray-700"
        >
          Search
        </label>
        <SearchInput />
      </div>
      <div>
        <label
          htmlFor="status-input"
          className="block font-mono text-sm font-semibold mb-1.5 dark:text-gray-300 text-gray-700"
        >
          Status
        </label>
        <StatusInput />
      </div>
    </div>
  );
}
