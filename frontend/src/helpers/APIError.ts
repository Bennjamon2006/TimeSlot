export default class APIError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: any,
  ) {
    super(message);
  }
}
