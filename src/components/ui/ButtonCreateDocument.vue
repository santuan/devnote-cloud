<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useFocusStore } from "@/stores/focus"
import { useI18n } from "vue-i18n"
import { useMagicKeys, whenever, breakpointsTailwind, useBreakpoints } from "@vueuse/core"

const keys = useMagicKeys()
const focus_store = useFocusStore()
const document = useDocumentStore()
const db_store = useDatabaseStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const magicNewDocument = keys["ctrl+alt+n"]
const largerThanLg = breakpoints.greater("lg")
const { t } = useI18n()

whenever(magicNewDocument, () => {
  new_document()
})

function new_document() {
  if (largerThanLg.value === true) {
    document.clear_editor()
    document.content_editable = true
  } else {
    document.clear_editor()
    document.show_sidebar_documents = false
    document.content_editable = true
  }
  focusOnTitle()
}

function focusOnTitle() {
  setTimeout(() => {
    focus_store.SetFocusTitle()
  }, 100)
}
</script>

<template>
  <div class="px-0 mx-1 mb-1 mt-1">
    <button
      @click="db_store.loaded_id === '' ? null : new_document()"
      class="CreateNewButton flex items-center my-0.5 justify-center gap-2 text-xs min-h-8 w-full text-left bg-primary focus-within:ring-1 ring-primary"
      :class="{
        '!bg-red-600 !ring-secondary !text-primary-foreground': db_store.loaded_id === null,
        '!bg-secondary !text-muted-foreground/50 ': db_store.loaded_id === '',
      }"
    >
      <Plus v-show="db_store.loaded_id !== ''" class="size-4 text-primary-foreground" />
      <span v-show="db_store.loaded_id === ''" class="flex items-center gap-1 text-primary">
        * {{ t("sidebar.newDocument") }}
        <span
          v-show="db_store.document_name"
          class="inline-block font-bold truncate opacity-80 max-w-24"
        >
          {{ db_store.document_name }}
        </span>
      </span>
      <span class="font-bold text-primary-foreground" v-show="db_store.loaded_id !== ''">
        {{ t("sidebar.newDocument") }}
      </span>
    </button>
  </div>
</template>
