import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
    isValidContentType
} from "../utils";
import {Request, Response, NextFunction} from "express";
import {Schema} from "joi";
import {ValidationError} from "./errors";
import {validateReq} from "./validations";


/**
 * @desc Custom wrapper around express req/res callback function.
 * @param {AnyFunction} func
 * @param {Schema} schema
 * @returns {ExpressCallBackFunction}
 */
export const controllerHandler = (func: AnyFunction, schema?: Schema): ExpressCallBackFunction => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const reqArgs = parseRequestArgs(req);
        const {file, param} = parseRequestArgs(req);


        if(!isValidContentType(req)) {
            res.status(400).json({
                status: "failed",
                error: `${req.headers['content-type']} is not an accepted Content-type`
            });
            return;
        }

        try{
            if (schema){
                if (param)
                validateReq(schema, param);

            }
        }catch (err: unknown){
            const error = new ValidationError(
              (err as any).message.replace('/', '').toLocaleString()
            );
            next(error);
        }

        const {code, ...info}: ReturnValue = await func(reqArgs);
        return res.status(code!).json(info);
    }
}
