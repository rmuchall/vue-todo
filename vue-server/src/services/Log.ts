import NodeConsole from "console";
import NodeUtil from "util";
import dayjs from "dayjs";

// https://github.com/chalk/ansi-styles/blob/main/index.js
const red = "\x1b[31m";    // error
const yellow = "\x1b[33m"; // warn
const green = "\x1b[32m";  // info
const cyan = "\x1b[36m";   // debug
const reset = "\x1b[39m";  // reset

class CustomConsole extends NodeConsole.Console {
    override error(...args: any): void {
        super.error(`[${dayjs().format("YYYY-MM-DD HH:MM:ss")}] ${red}ERROR${reset}`, NodeUtil.format(...args));
    }

    override warn(...args: any): void {
        super.warn(`[${dayjs().format("YYYY-MM-DD HH:MM:ss")}] ${yellow}WARN${reset}`, NodeUtil.format(...args));
    }

    override info(...args: any): void {
        super.info(`[${dayjs().format("YYYY-MM-DD HH:MM:ss")}] ${green}INFO${reset}`, NodeUtil.format(...args));
    }

    override debug(...args: any): void {
        super.debug(`[${dayjs().format("YYYY-MM-DD HH:MM:ss")}] ${cyan}DEBUG${reset}`, NodeUtil.format(...args));
    }
}

export const Log = new CustomConsole({
    stdout: process.stdout,
    stderr: process.stderr,
});
