<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  (e: 'submit', url: string): void
}>()
const modal = useModalStore()
const { t } = useI18n()
const imageUrl = ref('')

function handleSubmit() {
  emit('submit', imageUrl.value)
  imageUrl.value = ''
  modal.show_image_url_dialog = false
}
</script>

<template>
  <DialogRoot v-model:open="modal.show_image_url_dialog">
    <DialogPortal>
      <DialogOverlay class="bg-background/80 fixed inset-0 z-[60]" />
      <DialogContent
        class="font-mono fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-6 shadow focus:outline-none z-[100] border border-secondary"
      >
        <DialogTitle class="text-foreground m-0 text-[17px] font-medium">
          {{ t("verb.add") }} {{ t("toolbar.image") }}
        </DialogTitle>
        <DialogDescription class="text-foreground/60 mt-3 mb-5 text-[15px] leading-normal">
          {{ t("verb.add") }} {{ t("toolbar.image") }} via URL
        </DialogDescription>

        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
          <input
            v-model="imageUrl"
            type="url"
            required
            placeholder="https://"
            class="flex h-10 w-full text-foreground rounded-md border border-secondary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
          <div class="flex justify-end gap-4">
            <DialogClose
              class="bg-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground text-sm focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none"
            >
              {{ t("verb.cancel") }}
            </DialogClose>
            <button
              type="submit"
              class="bg-primary text-primary-foreground hover:bg-primary/90 text-sm focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none"
            >
              {{ t("verb.add") }}
            </button>
          </div>
        </form>

        <DialogClose
          class="text-foreground hover:bg-secondary/80 hover:text-foreground absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
        >
          <X />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
