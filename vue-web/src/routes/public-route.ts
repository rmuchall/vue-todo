import {RouteRecordRaw} from "vue-router";
import PublicLayout from "../components/PublicLayout.vue";
import PublicHome from "../components/public/PublicHome.vue";

export const publicRoute: RouteRecordRaw = {
    // https://localhost/
    path: "/",
    components: {
        layout: PublicLayout
    },
    children: [
        {
            // https://localhost/
            path: "",
            components: {
                content: PublicHome
            }
        },
    ],
    meta: {
        isShowProgressBar: true,
    }
};
