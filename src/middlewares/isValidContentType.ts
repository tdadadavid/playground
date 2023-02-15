import {isValidContentType} from "../utils";
import {NextFunction,Response, Request} from "express";
import {MediaProcessingError} from "../commons";

export const isContentTypeValid = (req: Request, res: Response, next: NextFunction) => {
  if(!isValidContentType(req)) {
    const error = new MediaProcessingError(
      `${req.headers['content-type']} is not an accepted Content-type`
    );

    next(error);
  }
  next();
}
