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
      all: "",
    };
    filterByStatus(values[(value as keyof typeof values) || ""]);
  }

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="2xx">2xx</SelectItem>
          <SelectItem value="4xx">4xx</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
