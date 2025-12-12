import { useRequestStore } from "@/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusInput() {
  const filterByStatus = useRequestStore((state) => state.filterByStatus);

  function onValueChange(value: string) {
    const values = {
      "2xx": "2xx",
      "4xx": "4xx",
      "5xx": "5xx",
      all: "",
    };
    filterByStatus(values[(value as keyof typeof values) || ""]);
  }

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger id="status-input" className="w-[180px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="2xx">2xx</SelectItem>
          <SelectItem value="4xx">4xx</SelectItem>
          <SelectItem value="5xx">5xx</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
