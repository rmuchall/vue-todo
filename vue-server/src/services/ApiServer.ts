import http, {Server} from "http";
import {Log} from "./Log";
import express from "express";
import path from "path";
import helmet from "helmet";
import {MetaController} from "meta-controller";
import {Database} from "./Database";
import {RequestContext} from "@mikro-orm/core";
import {TodoController} from "../controllers/TodoController";
import {Config} from "./Config";

export abstract class ApiServer {
    static isInitialized: boolean = false;

    static initialize(apiPort: number): Server {
        if (ApiServer.isInitialized) {
            throw new Error("ApiServer is already initialized");
        }

        // Create server
        const expressApp = express();

        // Apply global middleware
        const staticFileDir: string = path.resolve(process.cwd(), Config.env.staticFileDirectory);
        expressApp.use(express.static(staticFileDir));
        expressApp.use(helmet());

        // Must be called after any other middleware
        MetaController.useExpressServer(expressApp, {
            isUseCors: true,
            routePrefix: "api",
            controllerClassTypes: [
                TodoController
            ],
            globalMiddleware: [
                (request, response, next) => {
                    // Log.debug("Forking database request context");
                    // https://mikro-orm.io/docs/identity-map/#-requestcontext-helper-for-di-containers
                    RequestContext.create(Database.globalEntityManager, next);
                },
            ]
        });

        // Create HTTPS server
        const server: Server = http.createServer(expressApp);

        // Start server
        server.listen(apiPort);

        // Notify
        Log.info(`Express: Server is running on port = [${apiPort}]`);
        Log.info(`Express: Serving static files from = [${staticFileDir}]`);

        return server;
    }
}
