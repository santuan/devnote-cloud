<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "reka-ui"
import { Languages } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { useStorage } from "@vueuse/core"
import Tooltip from "./Tooltip.vue"

const storedLocale = useStorage("locale", "es")
const { t, locale } = useI18n()

function setLocale(lang) {
  locale.value = lang
  storedLocale.value = lang
}
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
    >
      <Tooltip :name="t('settings.language')">
        <span class="size-8 flex justify-center items-center">
          <Languages class="size-4" />
        </span>
        <span class="sr-only"> {{ t("settings.languageDescription") }}</span>
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :side="'bottom'"
      :align="'end'"
      class="z-10 grid w-32 text-xs bg-secondary border border-primary"
    >
      <DropdownMenuItem
        @click="setLocale('en')"
        class="p-2 hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
      >
        English
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="setLocale('es')"
        class="p-2 hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
      >
        Español
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
