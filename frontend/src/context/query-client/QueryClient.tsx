import { useRef, useCallback, useEffect } from "react";
import QueryClientContext, { Query } from "./QueryClient.context";

export default function QueryClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const queries = useRef<Map<string, Query<any>>>(new Map());

  const registerQuery = useCallback(
    <T,>(key: string, fn: () => Promise<T>, refetchTime?: number): Query<T> => {
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
        refetchTime: refetchTime || 0,
        lastFetched: null,
        refetch: async () => {
          if (query.promise) {
            return query.promise;
          }

          query.state = "loading";

          query.promise = fn()
            .then((data) => {
              query.data = data;
              query.state = "success";
              query.lastFetched = Date.now();
            })
            .catch((error) => {
              query.error = error;
              query.state = "error";
            })
            .finally(() => {
              query.promise = null;
              listeners.forEach((listener) => listener());
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      queries.current.forEach((query) => {
        if (query.refetchTime && query.lastFetched! + query.refetchTime < now) {
          query.refetch();
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <QueryClientContext.Provider
      value={{ queries: queries.current, registerQuery, invalidateQuery }}
    >
      {children}
    </QueryClientContext.Provider>
  );
}
