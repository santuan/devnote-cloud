import { defineStore } from "pinia"
import { useMagicKeys, whenever } from "@vueuse/core"
import { useDocumentStore } from "@/stores/document"
import { useModalStore } from "@/stores/modal"
import { storeToRefs } from "pinia"
import { useFocusStore } from "@/stores/focus"
import { useEditorStore } from "@/stores/editor"
import { useDatabaseStore } from "@/stores/database"
import { useFontSize } from "@/composables/useFontSize"

export const useMagicKeysStore = defineStore("magic-keys", () => {
  const keys = useMagicKeys()
  const document = useDocumentStore()
  const modal = useModalStore()
  const focus = useFocusStore()
  const db_store = useDatabaseStore()
  const editor_store = useEditorStore()
  const { toggleFontSize } = useFontSize()

  const { editor } = storeToRefs(editor_store)

  const magic_command_menu = keys["ctrl+alt+o"]
  const magic_ctrl_m = keys["ctrl+m"]
  const magic_delete_document = keys["shift+delete"]
  const magic_editor_toolbar = keys["ctrl+shift+alt+t"]
  const magic_focus_editor = keys["ctrl+shift+alt+e"]
  const magic_focus_sidebar = keys["ctrl+shift+alt+ArrowLeft"]
  const magic_focus_title = keys["ctrl+shift+alt+ArrowRight"]
  const magic_next_document = keys["ctrl+shift+ArrowDown"]
  const magic_previous_document = keys["ctrl+shift+ArrowUp"]
  const magic_show_settings = keys["ctrl+shift+alt+s"]
  const magic_toggle_preview = keys["ctrl+alt+p"]
  const magic_increase_font = keys["ctrl+shift+NumpadAdd"]
  const magic_decrease_font = keys["ctrl+shift+NumpadSubtract"]
  const magic_task_list = keys["ctrl+shift+alt+l"]

  whenever(magic_task_list, () => {
    editor.value.chain().focus().toggleTaskList().run()
    console.log("holis")
  })

  whenever(magic_increase_font, () => {
    toggleFontSize("increase")
  })

  whenever(magic_decrease_font, () => {
    toggleFontSize("decrease")
  })

  whenever(magic_focus_sidebar, (n) => {
    if (n) focus.setFocusSidebar()
  })

  whenever(magic_focus_title, (n) => {
    if (n) focus.SetFocusTitle()
  })

  whenever(magic_focus_editor, (n) => {
    if (n) editor.value.commands.focus()
  })

  whenever(magic_editor_toolbar, (n) => {
    if (n) document.show_editor_toolbar = !document.show_editor_toolbar
  })

  whenever(magic_ctrl_m, (n) => {
    if (n) document.show_sidebar_documents = !document.show_sidebar_documents
  })

  whenever(magic_toggle_preview, (n) => {
    if (n) document.toggle_editable()
  })

  whenever(magic_show_settings, (n) => {
    if (n) modal.show_settings = !modal.show_settings
  })

  whenever(magic_delete_document, (n) => {
    if (n)
      if (db_store.loaded_id) {
        modal.show_delete_document_modal = true
      }
  })

  whenever(magic_previous_document, () => {
    db_store.navigate_document("prev")
  })

  whenever(magic_next_document, () => {
    db_store.navigate_document("next")
  })

  whenever(magic_command_menu, (n) => {
    if (n) modal.show_commandbar = true
  })

  return {
    magic_show_settings,
    magic_ctrl_m,
    magic_toggle_preview,
    magic_focus_sidebar,
    magic_focus_title,
    magic_focus_editor,
    magic_editor_toolbar,
    magic_delete_document,
    magic_previous_document,
    magic_next_document,
    magic_command_menu,
  }
})