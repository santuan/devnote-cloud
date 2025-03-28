<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "reka-ui"
import Tooltip from "@/components/ui/Tooltip.vue"

import { db } from "@/db"
import { nextTick, shallowRef } from "vue"
import { storeToRefs } from "pinia"
import { useDocumentStore } from "@/stores/document"
import { useEditorStore } from "@/stores/editor"
import { useFocusStore } from "@/stores/focus"
import { useI18n } from "vue-i18n"
import { useModalStore } from "@/stores/modal"

const showNavigation = shallowRef(false)
const document = useDocumentStore()
const editor_store = useEditorStore()
const focus_store = useFocusStore()
const modal_store = useModalStore()

const { show_alert_logout } = storeToRefs(modal_store)
const { editor } = storeToRefs(editor_store)
const { focus_sidebar } = storeToRefs(focus_store)
const user = db.cloud.currentUser
import { useObservable } from "@vueuse/rxjs"

const ui = useObservable(
  db.cloud.currentUser
)

const { t } = useI18n()

function focusOnTitle() {
  document.content_editable = true
  setTimeout(() => {
    focus_store.SetFocusTitle()
  }, 100)
}

function focusDocumentsList() {
  showNavigation.value = false
  document.show_sidebar_documents = true
  setTimeout(() => {
    focus_store.setFocusDocumentsLists()
  }, 100)
}

const focusEditor = () => {
  document.content_editable = true
  nextTick(() => {
    setTimeout(() => {
      editor?.value.commands.focus()
    }, 100)
  })
}
</script>

<template>
  <DropdownMenuRoot v-model:open="showNavigation">
    <DropdownMenuTrigger
      class="flex items-center justify-start gap-2 p-1 w-8 h-8 focus-visible:ring-1 focus-within:ring-1 focus-within:ring-primary focus-visible:ring-primary"
      :aria-label="t('sidebar.navigation')"
    >
      <Tooltip :name="ui?.name !== 'Unauthorized' ? 'User' : 'Focus'">
        <svg
          ref="focus_sidebar"
          tabindex="-1"
          xmlns="http://www.w3.org/2000/svg"
          class="outline-none size-7"
          id="a"
          viewBox="0 0 384 311.02"
        >
          <path
            d="M.52 127.66V0h37.95c8.63 0 16.12 1.66 22.47 4.98 6.35 3.32 11.28 7.96 14.78 13.9s5.25 12.94 5.25 20.98V87.6c0 8.04-1.75 15.07-5.25 21.07-3.5 6.01-8.42 10.67-14.78 13.99-6.36 3.32-13.85 4.98-22.47 4.98H.52Zm21.86-19.59h16.09c6.3 0 11.31-1.83 15.04-5.51 3.73-3.67 5.6-8.66 5.6-14.95V39.87c0-6.18-1.87-11.1-5.6-14.78-3.73-3.67-8.74-5.51-15.04-5.51H22.38v88.49ZM99.41 127.66v-19.24h158.22V71h-152.1V52.46h152.1V19.24H99.41V0h179.73v127.66H99.41ZM323.49 127.66 291.32 0h22.56l19.41 83.24c1.05 4.08 2.01 8.48 2.89 13.2.87 4.72 1.54 8.48 2.01 11.28.46-2.8 1.14-6.56 2.01-11.28.87-4.72 1.84-9.18 2.89-13.38L361.79 0H384l-32.18 127.66h-28.33ZM0 309.27V181.61h26.76l35.5 103.18c-.35-3.73-.7-8.13-1.05-13.2-.35-5.07-.67-10.23-.96-15.48-.29-5.24-.44-9.91-.44-13.99v-60.51h19.94v127.66H52.99L17.84 206.09c.23 3.38.52 7.46.87 12.24s.64 9.68.87 14.69c.23 5.02.35 9.62.35 13.82v62.43H0ZM137.8 311.02c-12.24 0-21.95-3.5-29.12-10.49-7.17-6.99-10.76-16.67-10.76-29.03v-52.11c0-12.36 3.59-22.03 10.76-29.03 7.17-6.99 16.88-10.49 29.12-10.49s21.95 3.5 29.12 10.49c7.17 7 10.76 16.61 10.76 28.86v52.29c0 12.36-3.59 22.04-10.76 29.03-7.17 6.99-16.88 10.49-29.12 10.49Zm0-19.24c5.95 0 10.43-1.6 13.47-4.81 3.03-3.21 4.55-7.78 4.55-13.73v-55.61c0-5.94-1.52-10.52-4.55-13.73-3.03-3.2-7.52-4.81-13.47-4.81s-10.44 1.61-13.47 4.81c-3.03 3.21-4.55 7.78-4.55 13.73v55.61c0 5.94 1.51 10.52 4.55 13.73 3.03 3.21 7.52 4.81 13.47 4.81ZM223.39 309.27v-107.9h-33.4v-19.76h88.84v19.76h-33.4v107.9H223.4ZM295.27 309.27V181.61h76.59v19.24h-55.08v33.23h48.97v18.54h-48.97v37.42h55.08v19.24h-76.59Z"
            class="fill-primary"
          />
        </svg>
        <span class="sr-only"> Devnote. {{ t("sidebar.navigation") }} </span>
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuPortal >
      <DropdownMenuContent
        side="bottom"
        :side-offset="5"
        :align="'start'"
        class="p-1 w-64 bg-background border border-primary"
      >
        <div class="flex flex-col font-mono text-xs gap-1">
          <p class="text-primary sr-only font-semibold px-2 my-2">
            {{ t("sidebar.navigation") }}
          </p>
          <DropdownMenuItem
            class="text-foreground outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20 px-2 py-2 text-left"
            @click="focusDocumentsList()"
          >
            {{ t("commandBar.focusDocumentsList") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            class="text-foreground outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20 px-2 py-2 text-left"
            @click="focusOnTitle()"
          >
            {{ t("commandBar.focusTitle") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            class="text-foreground outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20 px-2 py-2 text-left"
            @click="focusEditor()"
          >
            {{ t("commandBar.focusEditor") }}
          </DropdownMenuItem>
          <DropdownMenuSeparator class="border-t border-primary/20"/>
          <p
            class="text-primary/70 !select-all font-bold text-sm px-2 my-2"
            v-if="user?.value?.name !== 'Unauthorized'"
          >
            {{ user?.value?.name }}
          </p>
          <DropdownMenuItem
            v-if="user?.value?.name !== 'Unauthorized'"
            class="text-foreground outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20 px-2 py-2 text-left"
            @click="show_alert_logout = true"
          >
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
