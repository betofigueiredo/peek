import { useRequestStore } from "@/store";

type Props = { id: string };

export function RequestRow({ id }: Props) {
  const endpoint = useRequestStore((state) => state.requests[id].endpoint);
  const status = useRequestStore((state) => state.requests[id].status);

  return (
    <div>
      {status} - {endpoint}
    </div>
  );
}
