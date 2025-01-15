<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { Code } from "lucide-vue-next"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.codeBlock')" shortcut="Ctrl Alt C" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      class="interactive gap-1 !min-w-24 md:!min-w-20"
      :value="t('toolbar.codeBlock')"
    >
      <p class="text-">Code</p>
      <Code />
      <span class="sr-only">{{ t("toolbar.codeBlock") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
