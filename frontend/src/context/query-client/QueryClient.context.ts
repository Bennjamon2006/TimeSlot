import { createContext } from "react";

export type Query<T> = {
  key: string;
  fn: () => Promise<T>;
  state: "idle" | "loading" | "success" | "error";
  data: T | null;
  error: Error | null;
  listeners: Set<() => void>;
  refetchTime: number | null;
  refetch: () => Promise<void>;
  promise: Promise<void> | null;
}

export type QueryClient = {
  queries: Map<string, Query<any>>;
  registerQuery: <T>(key: string, fn: () => Promise<T>) => Query<T>;
  unregisterQuery: (key: string) => void;
  invalidateQuery: (key: string) => void;
};

const QueryClientContext = createContext<QueryClient>({
  queries: new Map(),
  registerQuery: () => {
    throw new Error("registerQuery must be used within a QueryClientProvider");
  },
  unregisterQuery: () => {
    throw new Error("unregisterQuery must be used within a QueryClientProvider");
  },
  invalidateQuery: () => {
    throw new Error("invalidateQuery must be used within a QueryClientProvider");
  },
});

export default QueryClientContext;