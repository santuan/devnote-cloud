<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { onMounted } from "vue"
import Document from "@/components/Document.vue"
import PullToRefresh from "@/components/ui/PullToRefresh.vue"
import Sidebar from "@/components/Sidebar.vue"
import Toasts from "@/components/ui/Toasts.vue"
import { useToggleColorTheme } from "@/composables/useToggleColorTheme"

const colorTheme = useStorage("theme", "theme-forground")
const cursor_pointer = useStorage("cursor", true)

onMounted(() => {
  useToggleColorTheme(colorTheme.value)
})

</script>

<template>
  <main
    class="w-full min-h-screen font-mono bg-background text-foreground"
    :class="cursor_pointer ? 'cursor_pointer' : 'cursor_initial'"
  >
    <PullToRefresh>
      <div class="flex w-full print:!h-auto print:!overflow-y-auto h-svh overflow-y-hidden">
        <Sidebar />
        <Document />
      </div>
    </PullToRefresh>
  </main>
  <Toasts />
</template>

<style>

.dxc-login-dlg > div:first-child {
  background-color: hsl(var(--background)) !important;
  opacity: 0.9 !important;
}

.dxc-login-dlg div div {
  background-color: hsl(var(--background)) !important;
  color: hsl(var(--foreground)) !important;
  border-color: hsl(var(--primary)) !important;
  display: grid;
  gap: 0.75rem;
  --tw-shadow: 0 0 #0000 !important;
  --tw-shadow-colored: 0 0 #0000 !important;
  font-size: 0.875rem /* 14px */ !important;
  line-height: 1.25rem /* 20px */ !important;
  font-family: JetBrains Mono Variable, monospace !important;
  max-width: 24rem /* 384px */ !important;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
}

.dxc-login-dlg div div input {
  background-color: hsl(var(--secondary)) !important;
  border-color: hsl(var(--primary)) !important;
  color: hsl(var(--foreground)) !important;
  text-align: center;
  font-size: 0.875rem /* 14px */ !important;
  line-height: 1.25rem /* 20px */ !important;
  font-family: JetBrains Mono Variable, monospace !important;
}

.dxc-login-dlg div div div {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dxc-login-dlg div div h3 {
  text-align: center;
}

.dxc-login-dlg div div p {
  text-align: center;
}

.dxc-login-dlg div form label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
}

.dxc-login-dlg div form label input[type="otp"] {
  height: 3.5rem /* 56px */ !important;
  --tw-translate-y: -1.25rem /* -20px */;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

}

.dxc-login-dlg div div div button {
  @apply bg-primary shrink-0 border-secondary border text-primary-foreground hover:bg-primary/80 text-xs inline-flex h-[35px] items-center justify-center  rounded-[4px] px-[15px] font-semibold  gap-3  focus:outline-2 focus:outline-foreground focus:outline-dashed focus:outline-offset-2;
}

.dxc-login-dlg div p {
  color: hsl(var(--foreground)) !important;
}
</style>
