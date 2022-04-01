import Signals = NodeJS.Signals;
import {Log} from "./Log";

export abstract class SignalHandler {
    static isInitialized: boolean = false;

    static initialize(): void {
        if (SignalHandler.isInitialized) {
            throw new Error("SignalHandler already initialized");
        }

        process.on("SIGINT", () => SignalHandler.handleSignal("SIGINT"));
        process.on("SIGHUP", () => SignalHandler.handleSignal("SIGHUP"));
        process.on("SIGQUIT", () => SignalHandler.handleSignal("SIGQUIT"));
        process.on("SIGTERM", () => SignalHandler.handleSignal("SIGTERM"));

        process.on("uncaughtException", SignalHandler.handleError);
        process.on("exit", SignalHandler.handleExit);
    }

    static handleSignal(signal: Signals): void {
        Log.debug("SignalHandler: Received signal = [%s]", signal.toString());

        // Calls handleExit() for cleanup
        process.exit(1);
    }

    static handleError(error: Error): void {
        Log.error("SignalHandler: Uncaught exception");
        Log.error(error);

        // Calls handleExit() for cleanup
        process.exit(1);
    }

    static handleExit(): void {
        // Perform cleanup here
        Log.debug("SignalHandler: Cleanup()");
        Log.debug("SignalHandler: Exit()");
    }
}
