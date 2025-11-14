import { useEffect, useState, type ReactElement } from "react";
import { useRequestStore } from "@/store";
import { Button } from "@/components/ui/button";
import { UnfoldVertical } from "lucide-react";

export function RequestViewData({ id }: { id: string }) {
  type Block = { start: number; end: number };
  const request = useRequestStore((state) => state.requests[id]);
  const select = useRequestStore((state) => state.select);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const adjacentLinesToShow = 10;

  const search = "luiz fernando";

  function clear() {
    select(null);
  }

  /**
   * Button to expand and view more lines, up and down
   */
  function showMoreLines(idx: number) {
    const updatedBlocks = blocks.map((block) => {
      // TODO: check if match the previous block
      if (block.start === idx) {
        block.start -= adjacentLinesToShow;
      }
      // TODO: check if match the next block
      if (block.end === idx) {
        block.end += adjacentLinesToShow;
      }
      return block;
    });
    setBlocks(updatedBlocks);
  }

  /**
   * Find matchs on first render
   */
  useEffect(() => {
    // TODO: without search show first 500

    const result = [];
    let idx = 0;

    while (idx < request.responseAsArray.length) {
      const line = request.responseAsArray[idx].toLowerCase();
      if (line.includes(search.toLowerCase())) {
        result.push({
          start: idx - adjacentLinesToShow,
          end: idx + adjacentLinesToShow + 1,
        });
        idx += adjacentLinesToShow + 1;
      } else {
        idx += 1;
      }
    }

    setBlocks(result);
  }, [request.responseAsArray]);

  function renderElements(): ReactElement[] {
    const result = [];
    let spaces = 0;
    for (const block of blocks) {
      // Button to expand previous lines
      result.push(
        <button
          key={`${block.start}-unfold-previous`}
          onClick={() => showMoreLines(block.start)}
        >
          <UnfoldVertical />
        </button>,
      );
      // Render lines
      for (let i = block.start; i < block.end; i++) {
        const line = request.responseAsArray[i];
        if (!line) {
          continue;
        }
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
      // Button to expand next lines
      result.push(
        <button
          key={`${block.end}-unfold-next`}
          onClick={() => showMoreLines(block.end)}
        >
          <UnfoldVertical />
        </button>,
      );
      result.push(
        <div
          key={`space-${spaces}`}
          className="block h-0.5 bg-gray-700 mt-14 mb-16"
        />,
      );
      spaces += 1;
    }
    return result;
  }

  return (
    <>
      <div className="fixed w-5/6 h-full top-0 right-0 p-7 overflow-auto bg-background border-l border-(--panel-border) z-10">
        <Button onClick={clear}>close</Button>
        <div>{request.id}</div>
        <div className="p-5 bg-(--secondary-background) border border-(--panel-border)">
          {renderElements()}
        </div>
      </div>
      <div
        onClick={clear}
        className="absolute top-0 left-0 w-full h-full bg-black z-0 opacity-20"
      ></div>
    </>
  );
}
