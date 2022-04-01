import {Config} from "./services/Config";
import {Log} from "./services/Log";
import {ApiServer} from "./services/ApiServer";
import {SignalHandler} from "./services/SignalHandler";
import {Database} from "./services/Database";

SignalHandler.initialize();

(async () => {
    try {
        await Config.initialize();
        await Database.initialize();
        ApiServer.initialize(Config.env.apiPort);
    }
    catch (error) {
        Log.error("Database: Connection error");
        Log.error(error);
    }
})().catch(reason => Log.error(reason));
