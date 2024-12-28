import { defineStore } from "pinia"
import { shallowRef } from "vue"

export const useModalStore = defineStore("modal", () => {
  const show_info = shallowRef(false)
  const show_alert_unsaved_changes = shallowRef(false)
  const show_alert_logout = shallowRef(false)
  const show_settings = shallowRef(false)
  const show_commandbar = shallowRef(false)
  const show_delete_db_modal = shallowRef(false)
  const show_delete_document_modal = shallowRef(false)

  return {
    show_info,
    show_alert_unsaved_changes,
    show_alert_logout,
    show_settings,
    show_commandbar,
    show_delete_db_modal,
    show_delete_document_modal,
  }
})
