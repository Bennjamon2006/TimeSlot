import { useRef, useCallback } from "react";
import QueryClientContext, { Query } from "./QueryClient.context";

export default function QueryClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const queries = useRef<Map<string, Query<any>>>(new Map());

  const registerQuery = useCallback(
    <T,>(key: string, fn: () => Promise<T>): Query<T> => {
      if (queries.current.has(key)) {
        return queries.current.get(key) as Query<T>;
      }

      const listeners = new Set<() => void>();

      const suscribe = (listener: () => void) => {
        listeners.add(listener);
      };

      const unsuscribe = (listener: () => void) => {
        listeners.delete(listener);
      };

      const query: Query<T> = {
        key,
        fn,
        state: "idle",
        data: null,
        error: null,
        listeners,
        subscribe: suscribe,
        unsubscribe: unsuscribe,
        refetchTime: null,
        refetch: async () => {
          if (query.promise) {
            return query.promise;
          }

          query.state = "loading";
          query.refetchTime = Date.now();
          listeners.forEach((listener) => listener());

          query.promise = fn()
            .then((data) => {
              query.data = data;
              query.state = "success";
              listeners.forEach((listener) => listener());
            })
            .catch((error) => {
              query.error = error;
              query.state = "error";
              listeners.forEach((listener) => listener());
            })
            .finally(() => {
              query.promise = null;
            });

          await query.promise;
        },
        promise: null,
      };

      queries.current.set(key, query);
      return query;
    },
    [],
  );

  const invalidateQuery = useCallback((key: string) => {
    const query = queries.current.get(key);

    if (query) {
      query.refetch();
    }
  }, []);

  return (
    <QueryClientContext.Provider
      value={{ queries: queries.current, registerQuery, invalidateQuery }}
    >
      {children}
    </QueryClientContext.Provider>
  );
}
