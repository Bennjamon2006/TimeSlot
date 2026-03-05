import type { Response as ExpressResponse } from "express";

export default class Response {
  constructor(
    public readonly body: any,
    public readonly statusCode: number = 200,
    public readonly headers: Record<string, string> = {},
  ) {}

  public send(res: ExpressResponse) {
    for (const key in this.headers) {
      res.setHeader(key, this.headers[key]);
    }

    res.status(this.statusCode).json(this.body);
  }
}
