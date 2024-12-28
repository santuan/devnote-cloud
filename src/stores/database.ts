import { allItemsTodo } from "@/composables/queries"
import { db } from "@/db"
import { defineStore } from "pinia"
import { ref, shallowRef } from "vue"
import { toast } from "vue-sonner"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import { useModalStore } from "@/stores/modal"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"

export const useDatabaseStore = defineStore("database", () => {
  const { t } = useI18n()
  const { hasUnsavedChanges } = useUnsavedChanges()
  const document_store = useDocumentStore()
  const modal = useModalStore()

  const status = ref<"LOADING" | "READY" | "CREATING" | "CHANGING" | "ERROR">("LOADING")
  const select_id = shallowRef("")
  const loaded_id = shallowRef("")
  const document_name = shallowRef("")
  const document_body = shallowRef("")
  const document_checked = shallowRef(false)

  async function create_document() {
    status.value = "CHANGING"
    try {
      const new_document_id = await db.documents.add({
        date: new Date().toISOString(),
        document_data: {
          body: document_body.value,
          name: document_name.value,
          checked: false,
        },
      })
      loaded_id.value = new_document_id
      toast.success("document created with title: " + document_name.value)
    } catch (error) {
      handleError("Error al crear el proyecto", error)
    }
    status.value = "READY"
  }

  async function update_document() {
    if (!loaded_id.value || status.value !== "READY") return
    try {
      await db.documents.update(loaded_id.value, {
        date: new Date().toISOString(),
        document_data: {
          body: document_body.value,
          name: document_name.value,
          checked: document_checked.value,
        },
      })
    } catch (error) {
      handleError("Error al actualizar el proyecto", error)
    }
  }

  async function change_document_checked(item, isChecked) {
    try {
      await db.documents.update(item.id, {
        date: new Date().toISOString(),
        document_data: {
          body: item.document_data.body,
          name: item.document_data.name,
          checked: isChecked,
        },
      })
      toast(
        isChecked ?
          `"${item.document_data.name}" ${t("message.completed")}`
        : `"${item.document_data.name}" ${t("message.unmarked")}`,
      )
    } catch (error) {
      handleError("Error al marcar el proyecto", error)
    }
  }

  async function set_document(id: string) {
    const set_id = id ? id : null
    if (set_id === loaded_id.value) return
    status.value = "CHANGING"
    try {
      const document = await db.documents.get(set_id)
      if (document) {
        document_body.value = document.document_data.body
        document_name.value = document.document_data.name
        document_checked.value = document.document_data.checked
      } else {
        document_store.clear_editor()
        console.error("Selected document not found")
      }
      loaded_id.value = set_id
    } catch (error) {
      handleError("Error al seleccionar el proyecto", error)
    }
    status.value = "READY"
  }

  async function delete_document() {
    try {
      await db.documents.delete(loaded_id.value)
      document_store.clear_editor()
    } catch (error) {
      handleError("Error al eliminar el proyecto", error)
    }
  }

  function auto_save() {
    if (document_name.value === "") return
    if (status.value !== "READY") return
    update_document()
  }

  async function clear_database() {
    await db.documents.clear()
    document_store.clear_editor()
  }

  async function navigate_document(direction: "prev" | "next") {
    if (!allItemsTodo.value?.length) return

    const currentIndex = allItemsTodo.value.findIndex((item) => item.id === loaded_id.value)
    let nextIndex

    if (direction === "next") {
      nextIndex = currentIndex + 1
      if (nextIndex >= allItemsTodo.value.length) {
        nextIndex = 0 // Loop back to start
      }
    } else {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) {
        nextIndex = allItemsTodo.value.length - 1 // Loop to end
      }
    }

    const nextDoc = allItemsTodo.value[nextIndex]
    if (nextDoc) {
      if (hasUnsavedChanges()) {
        select_id.value = nextDoc.id
        modal.show_alert_unsaved_changes = true
        return
      }
      set_document(nextDoc.id)
    }
  }

  function handleError(message, error) {
    console.error(message, error)
    status.value = "ERROR"
  }

  return {
    auto_save,
    change_document_checked,
    clear_database,
    create_document,
    delete_document,
    loaded_id,
    navigate_document,
    document_body,
    document_checked,
    document_name,
    select_id,
    set_document,
    status,
    update_document,
  }
})
