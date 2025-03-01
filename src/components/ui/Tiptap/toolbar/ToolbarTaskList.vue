<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { storeToRefs } from "pinia"

import { SquareCheck } from 'lucide-vue-next';

import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { useEditorStore } from "@/stores/editor"
const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.addTask')" side="bottom">
    <ToolbarButton
      class="flex interactive items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
      @click="editor.chain().focus().toggleTaskList().run()"
      :value="t('toolbar.addTask')"
    >
      <SquareCheck class="size-4" />
      <span class="sr-only">{{ t("toolbar.addTask") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
