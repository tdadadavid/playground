import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
    isValidContentType
} from "../utils";
import {Request, Response, NextFunction} from "express";
import { Schema } from "joi";

/**
 * @desc Custom wrapper around express req/res callback function.
 * @param {AnyFunction} func
 * @param {Schema} schema
 * @returns {ExpressCallBackFunction}
 */
export const controllerHandler = (func: AnyFunction, schema?: Schema): ExpressCallBackFunction => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {file} = parseRequestArgs(req);

        if(!isValidContentType(req)) {
            res.status(400).json({
                status: "failed",
                error: " Content-type encoding is not accepted or undefined"
            });
            return;
        }

        const {code, ...data}: ReturnValue = await func(file);
        if(!code) res.status(200).json(data);

        res.status(code!).json(data);
    }
}
