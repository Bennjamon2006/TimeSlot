import useOperation from "./useOperation";

export default function <A extends any[], R>(
  operation: (...args: A) => Promise<R>,
) {
  return useOperation<A, R>(operation);
}
