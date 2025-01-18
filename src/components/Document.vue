<script setup>
import AlertLogout from "@/components/ui/AlertLogout.vue"
import AlertUnsavedChanges from "@/components/ui/AlertUnsavedChanges.vue"
import DeleteDocument from "@/components/ui/ButtonDeleteDocument.vue"
import DocumentEditor from "@/components/DocumentEditor.vue"
import SplitterGroup from "@/components/ui/SplitterGroup.vue"
import { useDocumentStore } from "@/stores/document"
const document = useDocumentStore()
</script>

<template>
  <div
    class="Document w-full min-h-screen bg-background print:pl-0"
    :class="document.show_sidebar_documents ? '!pl-0' : 'md:!pl-10'"
  >
    <SplitterGroup>
      <DocumentEditor />
    </SplitterGroup>
    <DeleteDocument />
    <AlertUnsavedChanges />
    <AlertLogout />
  </div>
</template>
