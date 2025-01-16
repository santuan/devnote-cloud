import Dexie, { type EntityTable } from "dexie"
import dexieCloud from "dexie-cloud-addon"

interface Documents {
  id?: string
  date?: string
  document_data?: DocumentData
}

interface DocumentData {
  name: string
  body?: string
  checked?: boolean
}

const db = new Dexie("DB", { addons: [dexieCloud] }) as Dexie & {
  documents: EntityTable<Documents, "id">
}

db.version(2).stores({
  documents: "@id, date, document_data",
})

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: import.meta.env.VITE_DBURL,
  requireAuth: true, // optional
  // customLoginGui: true
})


export type { Documents, DocumentData }
export { db }
