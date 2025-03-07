<script setup>
import { allItemsTodo, allItemsChecked } from "@/composables/queries"
import { ArrowDown, ArrowUp } from "lucide-vue-next"
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useFocusStore } from "@/stores/focus"
import { useI18n } from "vue-i18n"
import { useIsMobile } from "@/composables/useIsMobile"
import ButtonCreateDocument from "@/components/ui/ButtonCreateDocument.vue"
import NumberFlow from "@number-flow/vue"
import SearchItem from "./SearchItem.vue"
import SearchItemChecked from "./SearchItemChecked.vue"
const focus = useFocusStore()
const db_store = useDatabaseStore()
const { t } = useI18n()
const { isMobile } = useIsMobile()
const { focus_documents } = storeToRefs(focus)
</script>

<template>
  <div class="h-full @container">
    <ButtonCreateDocument />
    <div
      class="flex pl-2 pr-2 py-1.5 mt-0 focus-within:border-primary bg-primary/5 border-t border-primary/5 justify-between items-center"
    >
      <h2
        class="text-xs outline-none text-primary flex justify-start items-center gap-1"
        ref="focus_documents"
        tabindex="-1"
      >
        {{ t("commandBar.documents") }}
        <NumberFlow
          v-memo="[allItemsTodo?.length]"
          class="bg-primary font-mono font-bold text-primary-foreground size-4 rounded flex justify-center items-center"
          :value="`${allItemsTodo ? allItemsTodo?.length : 0}`"
        />
      </h2>
      <div
        v-if="!isMobile && allItemsTodo?.length >= 2"
        class="shrink-0 flex justify-end gap-1 opacity-60 text-xs text-foreground"
      >
        <kbd class="bg-background px-1">
          ctrl
          <span class="opacity-30">+</span>
          shift
          <span class="opacity-30">+</span>
        </kbd>
        <button
          @click="db_store.navigate_document('prev')"
          class="flex justify-center items-center bg-background outline-2 outline-primary hover:outline-offset-2 focus-visible:outline-offset-2 focus-visible:outline-dotted"
          :disabled="allItemsTodo?.length <= 1"
        >
          <ArrowUp class="size-4 opacity-80" />
          <span class="sr-only">Navigate prev</span>
        </button>
        <button
          @click="db_store.navigate_document('next')"
          class="flex justify-center items-center bg-background outline-2 outline-primary hover:outline-offset-2 focus-visible:outline-offset-2 focus-visible:outline-dotted"
          :disabled="allItemsTodo?.length <= 1"
        >
          <ArrowDown class="size-4 opacity-80" />
          <span class="sr-only">Navigate next</span>
        </button>
      </div>
    </div>
    <div class="overflow-y-auto SidebarDocuments overflow-x-hidden h-[calc(100dvh-6.7rem)]">
      <ScrollAreaRoot class="w-full h-full overflow-hidden" style="--scrollbar-size: 10px">
        <ScrollAreaViewport class="w-full h-full outline-primary/70">
          <div
            class="py-1 px-0.5 flex flex-col justify-start items-start relative gap-1 w-full min-h-24"
            v-if="allItemsTodo"
          >
            <SearchItem v-memo="[allItemsTodo]" v-for="item in allItemsTodo" :key="item.id" :data="item" />
            <SearchItemChecked v-memo="[allItemsChecked]" v-for="item in allItemsChecked" :key="item.id" :data="item" />
          </div>
          <div
            v-if="allItemsTodo?.length + allItemsChecked?.length === 0"
            class="w-full h-[calc(100vh-20rem)] text-center flex items-center justify-center"
          >
            <p class="w-40 text-xs text-muted-foreground text-pretty">
              {{ t("sidebar.noResultsDescription") }}
            </p>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
          class="flex select-none touch-none p-0.5 bg-secondary hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollAreaThumb
            class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </div>
  </div>
</template>
