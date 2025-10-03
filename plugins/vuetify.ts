import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const type = useCookie("theme");

  const vuetify = createVuetify({
    theme: {
      defaultTheme: type.value || "system",
    },
  });
  app.vueApp.use(vuetify);
});
