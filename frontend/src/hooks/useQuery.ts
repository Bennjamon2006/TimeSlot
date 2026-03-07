import { useEffect, useRef } from "react";
import useOperation from "./useOperation";

export default function useQuery<R>(
  operation: () => Promise<R>,
  deps: any[] = [],
) {
  const operationRef = useRef(operation);

  const operationResult = useOperation<[], R>(() => operationRef.current());

  useEffect(() => {
    operationResult.execute();
  }, [...deps]);

  return operationResult;
}
