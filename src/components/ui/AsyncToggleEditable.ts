import { defineAsyncComponent } from "vue"
import DialogButtonLoading from "./Settings/DialogButtonLoading.vue"

export const ToggleEditable = defineAsyncComponent({
  loader: () => import("./ToggleEditable.vue"),
  loadingComponent: DialogButtonLoading,
})
