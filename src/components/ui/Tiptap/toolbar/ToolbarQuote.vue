<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { Quote } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.quote')" shortcut="Ctrl Shift B" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      class="interactive"
      :value="t('toolbar.quote')"
    >
      <Quote />
      <span class="sr-only">{{ t("toolbar.quote") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
