import { defineAsyncComponent } from "vue"
import DialogButtonLoading from "./DialogButtonLoading.vue"

export const DialogSettings = defineAsyncComponent({
  loader: () => import("./DialogSettings.vue"),
  loadingComponent: DialogButtonLoading,
})
