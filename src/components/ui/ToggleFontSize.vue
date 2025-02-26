<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "reka-ui"
import { AArrowUp, AArrowDown, Check } from "lucide-vue-next"
import { onMounted } from "vue"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import CornerBottomRight from "@/assets/corner-bottom-right.vue"
import { useFontSize } from "@/composables/useFontSize" // Import the new composable

const document_store = useDocumentStore()
const { t } = useI18n()
const { appFontSize, fontSizes, toggleFontSize } = useFontSize() // Use the composable

// Helper function to get the font size name and size value
const getFontSizeInfo = (sizeClass) => {
  const sizeMap = {
    'app-font-size-xs': { name: t("settings.fontsizexs"), value: '.75rem' },
    'app-font-size-sm': { name: t("settings.fontsizesm"), value: '.875rem' },
    'app-font-size-md': { name: t("settings.fontsizemd"), value: '1rem' },
    'app-font-size-lg': { name: t("settings.fontsizelg"), value: '1.125rem' },
    'app-font-size-xl': { name: t("settings.fontsizexl"), value: '1.25rem' },
  }
  return sizeMap[sizeClass]
}

// Update font size on component mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    document.body.classList.remove(...fontSizes)
    document.body.classList.add(appFontSize.value)
  }
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive relative group">
      <Tooltip
        :name="t('settings.fontsize')"
        :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
        :align="'end'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary bg-background size-8"
        >
          <AArrowDown class="AArrowDown size-5" />
          <AArrowUp class="AArrowUp size-5" />
          <span class="sr-only">{{ t("settings.fontsizeDescription") }}</span>
        </span>
        <CornerBottomRight />
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :side="document_store.show_sidebar_documents ? 'bottom' : 'left'"
        :align="document_store.show_sidebar_documents ? 'end' : 'center'"
        class="z-10 grid w-48 text-xs bg-background border font-mono text-foreground border-primary"
        :side-offset="5"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            v-for="size in fontSizes"
            :key="size"
            @click="document.body.classList.remove(appFontSize.value); document.body.classList.add(size); appFontSize.value = size"
            class="p-2 flex justify-start gap-1 w-full outline-none hover:bg-secondary-foreground/10 focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
            :class="appFontSize === size ? 'text-primary' : ''"
          >
            <span>{{ getFontSizeInfo(size).name }} </span>
            <span class="opacity-50 scale-90">{{ getFontSizeInfo(size).value }}</span>
            <Check class="size-4 ml-auto" v-show="appFontSize === size" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style scoped>
.interactive[data-state="open"] {
  @apply text-primary;
}

.interactive[data-state="open"] .AArrowDown {
  @apply !flex;
}

.interactive[data-state="closed"] .AArrowDown {
  @apply !hidden;
}

.interactive[data-state="open"] .AArrowUp {
  @apply !hidden;
}

.interactive[data-state="closed"] .AArrowUp {
  @apply !flex;
}
</style>