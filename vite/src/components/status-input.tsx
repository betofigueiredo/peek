import { useRequestStore } from "@/store";
import { Button } from "@/components/ui/button";

export function StatusInput() {
  const filterByStatus = useRequestStore((state) => state.filterByStatus);

  function set200() {
    filterByStatus(200);
  }

  function set400() {
    filterByStatus(400);
  }

  function setNull() {
    filterByStatus(null);
  }

  return (
    <>
      <Button variant="outline" onClick={set200}>
        2xx
      </Button>
      <Button variant="outline" onClick={set400}>
        4xx
      </Button>
      <Button variant="outline" onClick={setNull}>
        clear
      </Button>
    </>
  );
}
