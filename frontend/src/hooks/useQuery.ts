import { useEffect, useRef, useState } from "react";
import useOperation from "./useOperation";

export default function useQuery<R>(
  operation: () => Promise<R>,
  deps: any[] = [],
) {
  const operationRef = useRef(operation);

  const operationResult = useOperation<[], R>(() => operationRef.current());
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    operationResult.execute();
  }, [...deps, refetchCount]);

  const refetch = () => {
    setRefetchCount((prev) => prev + 1);
  };

  return { ...operationResult, refetch };
}
