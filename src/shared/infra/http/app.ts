import dotenv from "dotenv";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";

dotenv.config();
createConnection();
const app = express();

app.use(express.json());

app.use("/api", swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response
      .status(500)
      .json({ message: `Internal Server Error - ${err.message}` });
  }
);

export { app };
