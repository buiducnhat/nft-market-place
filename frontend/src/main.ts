import App from "./App.vue";
import router from "./libs/router";
import "./style.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);

app.use(router);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
