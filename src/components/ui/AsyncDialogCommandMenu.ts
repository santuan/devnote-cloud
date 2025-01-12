import { defineAsyncComponent } from "vue"
import DialogButtonLoading from "./Settings/DialogButtonLoading.vue"

export const DialogCommandMenu = defineAsyncComponent({
  loader: () => import("./DialogCommandMenu.vue"),
  loadingComponent: DialogButtonLoading,
})
