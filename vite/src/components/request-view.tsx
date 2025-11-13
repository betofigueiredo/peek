import { useEffect } from "react";
import { useRequestStore } from "@/store";
import { RequestViewData } from "@/components/request-view-data";

export function RequestView() {
  const selectedID = useRequestStore((state) => state.selectedID);

  useEffect(() => {
    document.body.style.overflow = selectedID ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedID]);

  if (!selectedID) {
    return null;
  }

  return <RequestViewData id={selectedID} />;
}
