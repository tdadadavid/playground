import {RequestsArgs} from "./interface";
import {Request} from "express";
import {acceptedMimeTypes} from "./constants";

/**
 * @description parse all requests arguments
 * @param {Request} req
 * @returns {RequestsArgs}
 */
export const parseRequestArgs = (req: Request): RequestsArgs => {
  return {
    file: req.file as Express.Multer.File
  }
}

/**
 * @description extracts information about the request payload
 * @param {Request} req
 * @returns {string | undefined}
 */
const getContentType = (req: Request): string | undefined => {
  return req.headers['content-type']
}

/**
 * @description validates the request payload
 * @param {Request} req
 * @returns { boolean }
 */
export const isValidContentType = (req: Request): boolean => {
  const contentType: string | undefined = getContentType(req);
  if(!contentType) return false;

  return acceptedMimeTypes.includes(contentType);
}
