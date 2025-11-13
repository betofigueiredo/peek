import type { ReactElement } from "react";
import { useRequestStore } from "@/store";
import { Button } from "@/components/ui/button";

export function RequestViewData({ id }: { id: string }) {
  const request = useRequestStore((state) => state.requests[id]);
  const select = useRequestStore((state) => state.select);

  // const linesToShow = request.responseAsArray.slice(0, 500);

  function clear() {
    select(null);
  }

  function getAdjacentsLines(
    start: number,
    end: number,
    search: string,
  ): ReactElement[] {
    const result = [];
    for (let i = start; i < end; i++) {
      const line = request.responseAsArray[i];
      const highlight = line.toLowerCase().includes(search.toLowerCase())
        ? "bg-amber-100 text-black"
        : "";
      result.push(
        <div
          key={i}
          className={`py-1 truncate whitespace-pre-wrap font-mono text-base ${highlight}`}
        >
          <span className="opacity-30">{i}</span> {request.responseAsArray[i]}
        </div>,
      );
    }
    return result;
  }

  function findSearch(): ReactElement[] {
    const search = "luiz fernando";
    const adjacentLinesToShow = 20;
    const result = [];
    let idx = 0;

    while (idx < request.responseAsArray.length) {
      const line = request.responseAsArray[idx];

      if (line.toLowerCase().includes(search.toLowerCase())) {
        const previousLines = getAdjacentsLines(
          idx - adjacentLinesToShow,
          idx,
          search,
        );
        result.push(...previousLines);

        result.push(
          <div
            key={idx}
            className="py-1 truncate whitespace-pre-wrap font-mono text-base bg-amber-100 text-black"
          >
            <span className="opacity-30">{idx}</span> {line}
          </div>,
        );

        const nextLines = getAdjacentsLines(
          idx + 1,
          idx + adjacentLinesToShow + 1,
          search,
        );
        result.push(...nextLines);

        result.push(<div key={`${idx}-space1`}> - </div>);
        result.push(<div key={`${idx}-space2`}> - </div>);
        result.push(<div key={`${idx}-space3`}> - </div>);

        idx += 6;
      } else {
        idx += 1;
      }
    }

    return result;
  }

  return (
    <>
      <div className="fixed w-5/6 h-full top-0 right-0 p-7 overflow-auto bg-background border-l border-(--panel-border) z-10">
        <Button onClick={clear}>close</Button>
        <div>{request.id}</div>
        <div className="p-5 bg-(--secondary-background) border border-(--panel-border)">
          {findSearch()}
        </div>
      </div>
      <div
        onClick={clear}
        className="absolute top-0 left-0 w-full h-full bg-black z-0 opacity-20"
      ></div>
    </>
  );
}
