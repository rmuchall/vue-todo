import {Plugin} from "vue";
import {Router, NavigationGuard} from "vue-router";
import {ProgressBar} from "../services/ProgressBar";

let router: Router;
const navigationGuard: NavigationGuard = (to, from, next) => {
    // Show progress bar?
    const isShowProgressBar = to.matched.some(route => route.meta["isShowProgressBar"]);
    if (isShowProgressBar && ProgressBar.state.value.progress === 0) {
        console.log("Progressbar start()");
        ProgressBar.start();
    }

    next();
};

export const routerPlugin: Plugin = {
    install(app, options: Router) {
        router = options;
        router.beforeEach(navigationGuard);
    }
};
