export default class APIError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string | null = null,
    public readonly data: any = null,
  ) {
    super(message);
  }
}
