import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { normalizeString } from "@/utils/normalize-string";

interface BaseRequest {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  status: number;
  timestamp: string;
  responseTimeInMS: number;
}

export interface RawRequest extends BaseRequest {
  response: Record<string, unknown>;
}

export interface Request extends BaseRequest {
  response: string;
  responseAsArray: string[];
}

type State = {
  fileName: string;
  filters: {
    query: string;
    status: string;
  };
  requestsIDs: string[];
  requests: Record<string, Request>;
  selectedID: string | null;
};

type Actions = {
  loadFile: (fileName: string, data: RawRequest[]) => void;
  clear: () => void;
  filterByQuery: (query: string) => void;
  filterByStatus: (status: string) => void;
  select: (id: string | null) => void;
};

function filter(
  requests: Record<string, Request>,
  query: string,
  status: string,
): string[] {
  return Object.values(requests).reduce<string[]>((acc, cur) => {
    if (status && String(cur.status).charAt(0) !== status.charAt(0)) {
      return acc;
    }
    if (query && !cur.response.includes(query.toLowerCase())) {
      return acc;
    }
    acc.push(cur.id);
    return acc;
  }, []);
}

export const useRequestStore = create<State & Actions>()(
  immer((set) => ({
    fileName: "",
    filters: { query: "", status: "" },
    requestsIDs: [],
    requests: {},
    selectedID: null,
    select: (id) =>
      set((state) => {
        state.selectedID = id;
      }),
    loadFile: (fileName, data) =>
      set((state) => {
        data.forEach((request) => {
          const response = JSON.stringify(request.response, null, 2);
          state.requests[request.id] = {
            id: request.id,
            method: request.method,
            endpoint: request.endpoint,
            status: request.status,
            timestamp: request.timestamp,
            responseTimeInMS: request.responseTimeInMS,
            response: normalizeString(response),
            responseAsArray: response.split("\n"),
          };
          state.requestsIDs.push(request.id);
        });
        state.fileName = fileName;
        state.filters.query = "";
        state.filters.status = "";
      }),
    clear: () =>
      set((state) => {
        state.fileName = "";
        state.requests = {};
        state.requestsIDs = [];
        state.selectedID = null;
        state.filters = { query: "", status: "" };
      }),
    filterByQuery: (query) =>
      set((state) => {
        const filteredIDs = filter(state.requests, query, state.filters.status);
        state.filters.query = query;
        state.requestsIDs = filteredIDs;
      }),
    filterByStatus: (status) =>
      set((state) => {
        const filteredIDs = filter(state.requests, state.filters.query, status);
        state.filters.status = status;
        state.requestsIDs = filteredIDs;
      }),
  })),
);
