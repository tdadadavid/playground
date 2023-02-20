import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
} from "../utils";
import {Request, Response, NextFunction} from "express";
import {Schema} from "joi";
import {Handler} from "./Handler";
import {validateReq, ValidationError} from "../commons";


class ControlHandler extends Handler {
    /**
     * @desc Custom wrapper around express req/res callback function.
     * @param {AnyFunction} func
     * @param {Schema} schema
     * @returns {ExpressCallBackFunction}
     */
    handle(func: AnyFunction, schema?: Schema): ExpressCallBackFunction {
        return async (req: Request, res: Response, next: NextFunction) => {
            const reqArgs = parseRequestArgs(req);
            const {param, body} = parseRequestArgs(req);

            // validate request body, parameters and queries.
            try{
                if (schema){
                    if (param)
                        validateReq(schema, param);
                    if (body)
                        validateReq(schema, body);
                }
            }catch (err: unknown){
                const error: ValidationError = new ValidationError(
                  (err as any).message
                );
                next(error);
                return ;
            }

            const {code, ...info}: ReturnValue = await func(reqArgs);
            return res.status(code ?? 200).json(info);
        }
    }
}


export default new ControlHandler;
