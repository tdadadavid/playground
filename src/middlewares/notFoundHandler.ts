import {Response,NextFunction, Request} from "express";
import {NotFoundError} from "../commons/errors";


class NotFoundHandler {
  handle(req: Request, res: Response, next: NextFunction): void {
    next(new NotFoundError(`Route not found: ${req.path}`));
  }
}

export default new NotFoundHandler;
