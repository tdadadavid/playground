import "multer"
import {Express} from "express";

export interface RequestsArgs {
    file: Express.Multer.File;
}
