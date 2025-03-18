import { useDatabaseStore } from "@/stores/database"

export function useUnsavedChanges() {
  const db_store = useDatabaseStore()

  const hasUnsavedChanges = () => {
    if (db_store.document_body === "<p></p>") {
      return false
    }
    return (
      db_store.loaded_id === "" && // If no document is loaded
      db_store.document_body !== "" // If project body is marked as dirty
    )
  }

  return {
    hasUnsavedChanges,
  }
}
