import {EnvConfig} from "../src/models/EnvConfig";

const envConfig: EnvConfig = {
    apiPort: 5001,
    staticFileDirectory: "html",
    ormDropSchema: true,
    ormUpdateSchema: true,
    ormRunMigrations: true
};

export default envConfig;
