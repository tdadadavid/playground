import express, {Application} from "express";
import {router} from "./routes";
import morgan from "morgan";
import {errorHandler, notFoundHandler} from "./middlewares";

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1", router);
app.use(notFoundHandler.handle);
app.use(errorHandler.handle);
export default app;
