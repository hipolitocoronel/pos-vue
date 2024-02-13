import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueQueryPlugin);
app.use(autoAnimatePlugin);

app.mount("#app");
