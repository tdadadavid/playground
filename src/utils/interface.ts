import "multer"
import {Express} from "express";

export interface RequestsArgs {
    param: any;
    file: Express.Multer.File;
}
