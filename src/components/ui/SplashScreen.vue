<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useEditorStore } from "@/stores/editor"
import { useFocusStore } from "@/stores/focus"
import Tooltip from "./Tooltip.vue"
import Ripple from "./Inspira/Ripple/Ripple.vue"
import TextGenerateEffect from "./Inspira/TextGenerateEffect.vue"
const db_store = useDatabaseStore()
const document = useDocumentStore()
const focus = useFocusStore()
const editor_store = useEditorStore()
const { t } = useI18n()

function focusOnTitle() {
  document.toggle_editable()
  setTimeout(() => {
    focus.SetFocusTitle()
  }, 100)
}
</script>

<template>
  <div
    role="alert"
    class="absolute bg-background inset-0 overflow-hidden flex-col flex justify-start items-center z-20 w-full"
  >
    <Tooltip
      v-if="db_store.loaded_id === '' || editor_store.editor.isEmpty"
      :name="t('message.clickToEdit')"
      :side="'bottom'"
    >
      <button
        @click="focusOnTitle()"
        class="p-2 h-8 relative z-10 text-xs text-primary-foreground bg-primary"
      >
        <TextGenerateEffect
          class="translate-x-1"
          :words="t('message.documentNotSaved')"
          :delay="50"
        />
      </button>
    </Tooltip>
    <Ripple class="opacity-80" />
  </div>
</template>
