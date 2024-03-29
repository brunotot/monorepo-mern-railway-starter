import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { databaseConnect } from "./config";
import { getVar } from "./config/vars.config";
import { Route } from "./routes/Route";
import { logger, stream } from "./utils/logger";
//import { ErrorMiddleware } from "@middlewares/error.middleware";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.env = getVar("NODE_ENV") || "development";
    this.port = getVar("PORT") || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    //this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await databaseConnect();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(getVar("LOG_FORMAT"), { stream }));
    this.app.use(
      cors({
        origin: getVar("ORIGIN"),
        credentials: getVar("CREDENTIALS") === "true",
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      route.setupEndpoints();
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
    const specs = swaggerJSDoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    });
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  /*private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }*/
}
