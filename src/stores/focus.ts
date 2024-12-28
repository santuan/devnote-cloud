import { ref, shallowRef } from "vue"
import { defineStore } from "pinia"
import { useDocumentStore } from "@/stores/document"

export const useFocusStore = defineStore("focus", () => {
  const focus_title_textarea = shallowRef(null)
  const focus_sidebar = shallowRef(null)
  const focus_documents = shallowRef(null)
  const document = useDocumentStore()

  function SetFocusTitle() {
    document.content_editable = true
    if (focus_title_textarea.value) {
      focus_title_textarea?.value.focus()
    }
  }

  function setFocusSidebar() {
    focus_sidebar?.value.focus()
  }

  function setFocusDocumentsLists() {
    focus_documents?.value.focus()
  }

  return {
    SetFocusTitle,
    setFocusSidebar,
    setFocusDocumentsLists,
    focus_title_textarea,
    focus_sidebar,
    focus_documents,
  }
})
