import { useEditorStore } from "@/stores/editor"
import { useDatabaseStore } from "@/stores/database"
import { ref, shallowRef } from "vue"
import { defineStore, storeToRefs } from "pinia"

export const useDocumentStore = defineStore("document", () => {
  const db_store = useDatabaseStore()
  const editor_store = useEditorStore()
  const { editor } = storeToRefs(editor_store)

  const show_sidebar_documents = shallowRef(true)
  const show_editor_toolbar = shallowRef(true)
  const content_editable = shallowRef(true)

  function toggle_editable() {
    editor.value?.setEditable(!editor.value?.options?.editable)
    content_editable.value = editor.value?.options?.editable
  }

  function clear_editor() {
    db_store.loaded_id = ""
    db_store.document_name = ""
    db_store.document_body = ""
  }

  return {
    content_editable,
    show_editor_toolbar,
    show_sidebar_documents,
    toggle_editable,
    clear_editor,
  }
})
