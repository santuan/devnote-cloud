<script setup lang="ts">
import { toast } from "vue-sonner"
import { Toaster } from "vue-sonner"
import { useColorMode } from "@vueuse/core"
import { useI18n } from "vue-i18n"
import { useRegisterSW } from "virtual:pwa-register/vue"
import { watch } from "vue"

const { t } = useI18n()
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const mode = useColorMode()

watch(offlineReady, (value) => {
  if (value) {
    toast.success(t("message.offlineReady"), {
      duration: 4000,
    })
    offlineReady.value = false
  }
})

watch(needRefresh, (value) => {
  if (value) {
    toast.info(t("message.newVersionAvailable"), {
      description: t("message.clickToUpdate"),
      duration: Infinity,
      action: {
        label: t("message.updateButton"),
        onClick: () => updateServiceWorker(),
      },
    })
  }
})
</script>

<template>
  <div />
  <Toaster :theme="mode === 'light' ? 'light' : 'dark'" position="bottom-left" />
  <!-- TODO, fix this convert to proper file-->
</template>
