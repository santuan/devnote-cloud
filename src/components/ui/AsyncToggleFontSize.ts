import { defineAsyncComponent } from "vue"
import DialogButtonLoading from "./Settings/DialogButtonLoading.vue"

export const ToggleFontSize = defineAsyncComponent({
  loader: () => import("./ToggleFontSize.vue"),
  loadingComponent: DialogButtonLoading,
})
