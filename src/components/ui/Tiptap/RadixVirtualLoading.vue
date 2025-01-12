<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <div
    class="h-6 min-w-20 font-mono text-foreground border border-secondary bg-secondary flex justify-center items-center text-xs"
  >
    {{ t("verb.loading") }}
  </div>
</template>
