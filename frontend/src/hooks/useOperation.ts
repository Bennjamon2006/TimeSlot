import { useState, useRef, useCallback } from "react";

export type OperationState = "idle" | "loading" | "success" | "error";

interface UseOperationResult<A extends any[], R> {
  state: OperationState;
  data: R | null;
  error: Error | null;
  execute: (...args: A) => Promise<R>;
  reset: () => void;
}

export default function useOperation<A extends any[], R>(
  operation: (...args: A) => Promise<R>,
): UseOperationResult<A, R> {
  const [state, setState] = useState<OperationState>("idle");
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const operationIdRef = useRef(0);

  const execute = useCallback(
    async (...args: A) => {
      operationIdRef.current += 1;
      const operationId = operationIdRef.current;

      setState("loading");
      setData(null);
      setError(null);

      try {
        const result = await operation(...args);

        if (operationId === operationIdRef.current) {
          setError(null);
          setData(result);
          setState("success");
        }

        return result;
      } catch (err) {
        if (operationId === operationIdRef.current) {
          setData(null);
          setError(err instanceof Error ? err : new Error(String(err)));
          setState("error");
        }

        throw err;
      }
    },
    [operation],
  );

  const reset = useCallback(() => {
    setState("idle");
    setData(null);
    setError(null);
  }, []);

  return { state, data, error, execute, reset };
}
