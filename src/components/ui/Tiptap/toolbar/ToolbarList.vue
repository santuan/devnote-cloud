<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { List, ListOrdered } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.bulletList')" shortcut="Ctrl Shift 8" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
      class="interactive"
      :value="t('toolbar.bulletList')"
    >
      <List class="!size-5"/>
      <span class="sr-only">{{ t("toolbar.bulletList") }}</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip :name="t('toolbar.orderedList')" shortcut="Ctrl Shift 7">
    <ToolbarButton
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
      class="interactive"
      :value="t('toolbar.orderedList')"
    >
      <ListOrdered class="!size-5"/>
      <span class="sr-only">{{ t("toolbar.orderedList") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>
