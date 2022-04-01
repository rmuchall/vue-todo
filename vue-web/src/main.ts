// Style
import "./main.css";
// Code
import {createApp} from "vue";
import App from "./App.vue";
import {Modal} from "shared-web/services/Modal";
import {appRouter} from "./app-router";
import {routerPlugin} from "shared-web/plugins/RouterPlugin";
import {createPinia} from "pinia";

// Global error handler
window.addEventListener("error", ev => {
    console.error(ev.error);
    alert(`Error: ${ev.error.message}`);
});

// Create App
const app = createApp(App);
app.config.errorHandler = (err, vm, info) => {
    console.error(err);
    if (err instanceof Error) {
        Modal.red("Error", `Error: ${err.message}`);
    } else {
        Modal.red("Error", "An unknown error occurred.");
    }
};
app.use(createPinia());
app.use(appRouter);
app.use(routerPlugin, appRouter);
app.mount("#app");
