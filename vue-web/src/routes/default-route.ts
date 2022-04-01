import {RouteRecordRaw} from "vue-router";

export const defaultRoute: RouteRecordRaw = {
    // Any unknown paths redirect to 404 error
    // https://next.router.vuejs.org/guide/migration/index.html#removed-star-or-catch-all-routes
    path: "/:pathMatch(.*)",
    redirect: "/error/404"
};
