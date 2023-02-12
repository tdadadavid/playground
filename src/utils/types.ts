import { NextFunction, Request, Response } from "express";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type AnyFunction = (...args: any[]) => Optional<{ code: number, message: string, data: string }, "code" | "message" | "data">;
export type ReturnValue = {
    code?: number,
    message?: string,
    data?: any
}


export type ExpressCallBackFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;