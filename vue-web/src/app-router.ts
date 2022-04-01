import {createRouter, createWebHashHistory} from "vue-router";
import {defaultRoute} from "./routes/default-route";
import {publicRoute} from "./routes/public-route";

// Add routes (singular defined)
export const appRouter = createRouter({
    history: createWebHashHistory(),
    routes: [
        defaultRoute,
        publicRoute
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    }
});
