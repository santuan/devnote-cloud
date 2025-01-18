<script setup lang="ts">
import { ToolbarButton } from "reka-ui"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { Eye } from "lucide-vue-next"
const document = useDocumentStore()
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('sidebar.contentPreview')" side="bottom">
    <ToolbarButton
      @click="document.toggle_editable()"
      class="interactive"
      :value="t('sidebar.contentPreview')"
    >
      <Eye />
      <span class="sr-only">{{ t("sidebar.contentPreview") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
