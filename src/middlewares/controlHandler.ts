import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
} from "../utils";
import {Request, Response, NextFunction} from "express";
import {Schema} from "joi";
import {ValidationError} from "../commons/errors";
import {validateReq} from "../commons/validations";
import {Handler} from "./Handler";


export class ControlHandler extends Handler {
    /**
     * @desc Custom wrapper around express req/res callback function.
     * @param {AnyFunction} func
     * @param {Schema} schema
     * @returns {ExpressCallBackFunction}
     */
    handle(func: AnyFunction, schema?: Schema): ExpressCallBackFunction {
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
}