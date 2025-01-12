import { defineAsyncComponent } from "vue"
import RadixVirtualLoading from "./RadixVirtualLoading.vue"

export const RadixVirtual = defineAsyncComponent({
  loader: () => import("./RadixVirtual.vue"),
  loadingComponent: RadixVirtualLoading,
})
