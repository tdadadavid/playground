import {ApiError} from "./ApiError";

export class ValidationError extends ApiError {
  constructor(msg: string) {
    super(msg);
    this._name = "Validation Error";
    this._statusCode = 422;
  }
}
