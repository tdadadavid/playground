

export class ApiError extends Error {

  _statusCode: number;
  _message: string;
  _name: string;
  constructor(msg: string) {
    super(msg);
    this._message = msg;
    this._name = "API Error";
    this._statusCode = 100;

    Error.captureStackTrace(this, this.constructor);
  }

  get message(){
    return this._message;
  }

  get status(){
    return this._statusCode;
  }

}
