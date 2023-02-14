import {
    AnyFunction,
    ExpressCallBackFunction,
    parseRequestArgs,
    ReturnValue,
    isValidContentType
} from "../utils";
import {Request, Response, NextFunction} from "express";
import {object, Schema} from "joi";
import {FfmpegCommand} from "fluent-ffmpeg";

/**
 * @desc Custom wrapper around express req/res callback function.
 * @param {AnyFunction} func
 * @param {Schema} schema
 * @returns {ExpressCallBackFunction}
 */
export const controllerHandler = (func: AnyFunction, schema?: Schema): ExpressCallBackFunction => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {file} = parseRequestArgs(req);

        if(!isValidContentType(req)) {
            res.status(400).json({
                status: "failed",
                error: `${req.headers['content-type']} is not an accepted Content-type`
            });
            return;
        }
        const {code, ...info}: ReturnValue = await func({ file });

        // if(info.data instanceof object){
        //     return info.data.writeToStream(res);
        // }

        // if(!code) res.status(200).json(info);

        info.data.pipe(res, { end: true });
        // res.status(code!).json(info);
    }
}
