import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Request = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  status: number;
  timestamp: string;
  responseTime: number;
  response: string;
  responseAsArray?: string[];
};

type State = {
  fileName: string;
  filters: {
    query: string;
    status: number | null;
  };
  requestsIDs: string[];
  requests: Record<string, Request>;
};

type Actions = {
  loadFile: (fileName: string, data: Request[]) => void;
  filterByQuery: (query: string) => void;
  filterByStatus: (status: number | null) => void;
};

function filter(
  requests: Record<string, Request>,
  query: string,
  status: number | null,
): string[] {
  return Object.values(requests).reduce<string[]>((acc, cur) => {
    if (status && cur.status !== status) {
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
    filters: {
      query: "",
      status: null,
    },
    requestsIDs: [],
    requests: {},
    loadFile: (fileName: string, data: Request[]) =>
      set((state) => {
        data.forEach((request) => {
          const response = JSON.stringify(
            request.response,
            null,
            2,
          ).toLowerCase();
          state.requests[request.id] = {
            id: request.id,
            method: request.method,
            endpoint: request.endpoint,
            status: request.status,
            timestamp: request.timestamp,
            responseTime: request.responseTime,
            response,
            responseAsArray: response.split("\n"),
          };
          state.requestsIDs.push(request.id);
        });
        state.fileName = fileName;
        state.filters.query = "";
        state.filters.status = null;
      }),
    filterByQuery: (query: string) =>
      set((state) => {
        const filteredIDs = filter(state.requests, query, state.filters.status);
        state.filters.query = query;
        state.requestsIDs = filteredIDs;
      }),
    filterByStatus: (status: number | null) =>
      set((state) => {
        const filteredIDs = filter(state.requests, state.filters.query, status);
        state.filters.status = status;
        state.requestsIDs = filteredIDs;
      }),
  })),
);
