import { defineAsyncComponent } from "vue"

export const EditorToolbar = defineAsyncComponent({
  loader: () => import("./EditorToolbar.vue"),
})
