export default class RequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details?: any,
  ) {
    super(message);
  }
}
