import "./lib/w.scss";
import "./index.scss";
import { createApp } from "vue";
import "./index.scss";
import router from "./router";
import App from "./App.vue";
import '@svgstore';

const app = createApp(App);
app.use(router).mount("#app");
