import { createApp } from "vue"
import { createPinia } from "pinia"
import "./assets/main.css"
import "./assets/driver.css"
import App from "./App.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { i18n } from "./i18n"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(i18n)

app.mount("#app")
