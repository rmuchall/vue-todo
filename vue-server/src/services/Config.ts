import {Log} from "./Log";
import path from "path";
import {EnvConfig} from "../models/EnvConfig";
import {MetaValidator} from "meta-validator";
import {MikroORMOptions} from "@mikro-orm/core";

export abstract class Config {
    static isInitialized = false;
    static env: EnvConfig;
    static orm: MikroORMOptions;

    static async initialize(): Promise<void> {
        if (Config.isInitialized) {
            throw new Error("Config is already initialized");
        }

        Log.info(`Config: Environment = [${process.env["NODE_ENV"]}]`);
        // Import environment config
        const importedEnvConfig = await import(path.resolve(process.cwd(), `config/${process.env["NODE_ENV"]}-env`));
        Config.env = Object.assign(new EnvConfig(), importedEnvConfig.default);
        // Validate environment config
        const validationErrors = await new MetaValidator().validate(Config.env);
        if (Object.keys(validationErrors).length > 0) {
            Log.error(validationErrors);
            throw new Error("Invalid configuration");
        }
        // Import database config
        const importedOrmConfig = await import(path.resolve(process.cwd(), `config/${process.env["NODE_ENV"]}-orm`));
        Config.orm = importedOrmConfig.default;

        Config.isInitialized = true;
    }
}
