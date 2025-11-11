import { useState } from "react";
import { useRequestStore } from "@/store";

export function SearchInput() {
  const [value, setValue] = useState("");
  const filterByQuery = useRequestStore((state) => state.filterByQuery);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    filterByQuery(event.target.value);
  }

  return <input type="text" value={value} onChange={onChange} />;
}
