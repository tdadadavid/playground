import {NextFunction, Request, Response} from "express";
import {ApiError} from "../commons/errors/ApiError";
import {Handler} from "./Handler";


class ErrorHandler extends Handler {

  handle(err: any, req: Request, res: Response, next: NextFunction){
    let message  = "Internal Server Error";
    let status = 500;

    console.log(err);
    if (err instanceof ApiError){
      message = err.message;
      status = err.status
    }

    return res.status(status).json({ error: message });
  }

}

export default new ErrorHandler();
