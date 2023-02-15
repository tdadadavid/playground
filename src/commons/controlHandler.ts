import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
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
        const {param} = parseRequestArgs(req);

        // validate request body, parameters and queries.
        // try{
        //     if (schema){
        //         if (param) {
        //             validateReq(schema, param);
        //         }
        //
        //     }
        // }catch (err: unknown){
        //     const error = new ValidationError(
        //       (err as any).message
        //     );
        //     next(error);
        //     return ;
        // }

        const {code, ...info}: ReturnValue = await func(reqArgs);
        return res.status(code!).json(info);
    }
}
