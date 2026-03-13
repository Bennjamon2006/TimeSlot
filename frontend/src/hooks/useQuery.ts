import { useContext, useState, useEffect } from "react";
import QueryClientContext from "../context/query-client/QueryClient.context";

export default function useQuery<T>(key: string, fn: () => Promise<T>) {
  const { registerQuery } = useContext(QueryClientContext);

  const query = registerQuery<T>(key, fn);

  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    query.state,
  );
  const [data, setData] = useState<T | null>(query.data);
  const [error, setError] = useState<Error | null>(query.error);

  useEffect(() => {
    const handleStateChange = () => {
      setState(query.state);
      setData(query.data);
      setError(query.error);
    };

    query.subscribe(handleStateChange);

    if (query.state === "idle") {
      query.refetch();
    }

    return () => {
      query.unsubscribe(handleStateChange);
    };
  }, [query]);

  const refetch = () => {
    query.refetch();
  };

  return {
    state,
    data,
    error,
    refetch,
  };
}
