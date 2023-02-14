import {ApiError} from "./ApiError";


export class MediaProcessingError  extends ApiError {
  constructor(msg: string) {
    super(msg);
    this._message = msg;
    this._name = "Media Processing Error";
    this._statusCode = 422;
  }

}
