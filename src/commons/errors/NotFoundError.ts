import {ApiError} from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(msg: string) {
    super(msg);
    this._statusCode = 404;
    this._name = "Not found"
    this._message = `route not found: ${msg}`;
  }
}
