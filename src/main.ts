import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

const app = createApp(App);
const vuetify = createVuetify({ components });

app.use(createPinia());
app.use(vuetify);
app.mount("#app");
