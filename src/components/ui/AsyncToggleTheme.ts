import { defineAsyncComponent } from "vue"
import DialogButtonLoading from "./Settings/DialogButtonLoading.vue"

export const ToggleTheme = defineAsyncComponent({
  loader: () => import("./ToggleTheme.vue"),
  loadingComponent: DialogButtonLoading,
})
