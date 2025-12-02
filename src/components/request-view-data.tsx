import { useEffect, useState, type ReactElement } from "react";
import { UnfoldVertical, X } from "lucide-react";
import { useRequestStore } from "@/store";
import { getStatusColor } from "@/utils/get-status-color";
import { formatTimestamp } from "@/utils/format-timestamp";
import { normalizeString } from "@/utils/normalize-string";
import { Button } from "@/components/ui/button";

/**
 * TODO:
 * - show search
 */
export function RequestViewData({ id }: { id: string }) {
  type Block = { start: number; end: number };
  const request = useRequestStore((state) => state.requests[id]);
  const select = useRequestStore((state) => state.select);
  const search = useRequestStore((state) => state.filters.query);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const adjacentLinesToShow = search ? 24 : 1000;

  function clear() {
    select(null);
  }

  /**
   * Expand to view more lines, up and down
   */
  function showMoreLines(idx: number) {
    const updatedBlocks = blocks.map((block, blockIdx) => {
      if (block.start === idx) {
        // Check if match the previous block
        const prevBlock = blocks[blockIdx - 1];
        const mergeWithPrev =
          prevBlock && prevBlock.end >= block.start - adjacentLinesToShow;
        block.start = mergeWithPrev
          ? prevBlock.end
          : block.start - adjacentLinesToShow;
      }
      if (block.end === idx) {
        // Check if match the next block
        const nextBlock = blocks[blockIdx + 1];
        const mergeWithNext =
          nextBlock && nextBlock.start <= block.end + adjacentLinesToShow;
        block.end = mergeWithNext
          ? nextBlock.start
          : block.end + adjacentLinesToShow;
      }
      return block;
    });
    setBlocks(updatedBlocks);
  }

  /**
   * Find matchs on first render
   */
  useEffect(() => {
    const result: Block[] = [];

    if (search) {
      let idx = 0;
      while (idx < request.responseAsArray.length) {
        const line = request.responseAsArray[idx].toLowerCase();
        if (normalizeString(line).includes(search.toLowerCase())) {
          // Prevent overlapping blocks
          const previousBlock = result[result.length - 1];
          const start =
            previousBlock?.end >= idx - adjacentLinesToShow
              ? previousBlock.end
              : idx - adjacentLinesToShow;
          const end = idx + adjacentLinesToShow + 1;
          result.push({ start, end });
          idx += adjacentLinesToShow + 1;
        } else {
          idx += 1;
        }
      }
    } else {
      result.push({ start: 0, end: adjacentLinesToShow });
    }

    setBlocks(result);
  }, [request.responseAsArray, search, adjacentLinesToShow]);

  /**
   * Button to expand previous lines
   */
  function addExpandPrevLinesButton(block: Block, idx: number): ReactElement[] {
    // First line, no button
    const isFirstLine = block.start <= 0;
    if (isFirstLine) return [];

    // Check if connected to previous block
    const isConnectedToPrev = blocks[idx - 1]?.end >= block.start;
    if (isConnectedToPrev) return [];

    return [
      <button
        key={`${block.start}-unfold-previous`}
        onClick={() => showMoreLines(block.start)}
      >
        <UnfoldVertical />
      </button>,
    ];
  }

  /**
   * Button to expand next lines
   */
  function addExpandNextLinesButton(block: Block, idx: number): ReactElement[] {
    // First line, no button
    const isLastLine = block.end >= request.responseAsArray.length;
    if (isLastLine) return [];

    // Check if connected to previous block
    const isConnectedToNext = blocks[idx + 1]?.start <= block.end;
    if (isConnectedToNext) return [];

    return [
      <button
        key={`${block.end}-unfold-next`}
        onClick={() => showMoreLines(block.end)}
      >
        <UnfoldVertical />
      </button>,
      <div
        key={`space-${block.end}`}
        className="block h-0.5 bg-gray-700 mt-8 mb-10"
      />,
    ];
  }

  /**
   * Render all elements
   */
  function renderElements(): ReactElement[] {
    const result = [];

    for (const [idx, block] of blocks.entries()) {
      // Button to expand previous lines
      result.push(...addExpandPrevLinesButton(block, idx));

      // Render lines
      for (let i = block.start; i < block.end; i++) {
        const line = request.responseAsArray[i];
        if (!line) continue;

        const highlight =
          search && normalizeString(line).includes(search.toLowerCase())
            ? "bg-amber-100 text-black"
            : "";
        result.push(
          <div
            key={i}
            className={`relative py-1 pl-10 truncate whitespace-pre-wrap font-mono text-base ${highlight}`}
          >
            <span className="absolute left-0 opacity-30">{i}</span>{" "}
            {request.responseAsArray[i]}
          </div>,
        );
      }

      // Button to expand next lines
      result.push(...addExpandNextLinesButton(block, idx));
    }
    return result;
  }

  return (
    <>
      <Button
        onClick={clear}
        className="fixed size-12 top-3 right-5/6 mr-3 bg-background border border-(--panel-border) z-10 text-white hover:bg-(--secondary-background) hover:cursor-pointer"
      >
        <X className="size-6" />
      </Button>
      <div className="fixed w-5/6 h-full top-0 right-0 p-7 overflow-auto bg-background border-l border-(--panel-border) z-10 font-mono">
        <div
          className={`w-16 py-1.5 ${getStatusColor(request.status)} border border-gray-900 text-black text-center shrink-0`}
        >
          {request.status}
        </div>
        <div className="my-5 font-semibold text-lg">{request.endpoint}</div>
        <div className="flex">
          <div className="font-medium">{request.method}</div>
          <div className="px-3 text-gray-600 shrink-0">|</div>
          <div>{formatTimestamp(request.timestamp)}</div>
          <div className="px-3 text-gray-600 shrink-0">|</div>
          <div>{request.responseTimeInMS} ms</div>
        </div>
        <div className="mt-7 text-gray-600">
          -----------------------------------
        </div>
        <div className="mt-7 mb-3">Response:</div>
        <div className="p-5 bg-(--secondary-background) border border-(--panel-border)">
          {renderElements()}
        </div>
      </div>
      <div
        onClick={clear}
        className="fixed top-0 left-0 w-full h-full bg-black z-0 opacity-20"
      ></div>
    </>
  );
}
