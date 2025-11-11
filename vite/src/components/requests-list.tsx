import { useRequestStore } from "@/store";
import { RequestRow } from "@/components/request-row";

export function RequestsList() {
  const requestsIDs = useRequestStore((state) => state.requestsIDs);

  return (
    <div className="mt-4">
      {requestsIDs.map((id) => (
        <RequestRow key={id} id={id} />
      ))}
    </div>
  );
}
