import { useState } from "react";
import { useRequestStore } from "@/store";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  const [value, setValue] = useState("");
  const filterByQuery = useRequestStore((state) => state.filterByQuery);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    filterByQuery(event.target.value);
  }

  return (
    <Input
      id="search-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Filter requests..."
      className="w-full px-3 py-2"
    />
  );
}
