import { createApp } from "vue";
import { Icon } from "@iconify/vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("IconifyIcon", Icon);
app.use(router);
app.mount("#app");
