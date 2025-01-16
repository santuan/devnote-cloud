<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "reka-ui"
import { computed, onMounted } from "vue"
import { SunMedium, Moon } from "lucide-vue-next"
import { useColorMode, useStorage, useFavicon, useDark } from "@vueuse/core"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import CornerBottomRight from "@/assets/corner-bottom-right.vue"

const props = defineProps({
  side: {
    type: String,
    required: false,
    default: "left",
  },
})

const document_store = useDocumentStore()
const mode = useColorMode()
const isDark = useDark()
const colorTheme = useStorage("theme", "theme-forground")
const { t } = useI18n()

const favicon = computed(() => {
  const theme = colorTheme.value.replace("theme-", "")
  return isDark.value ? `${theme}-dark.png` : `${theme}-light.png`
})

useFavicon(favicon, {
  baseUrl: "/",
  rel: "icon",
})

const toggleColorTheme = (theme) => {
  document.body.classList.remove(colorTheme.value)
  document.body.classList.add(theme)
  colorTheme.value = theme
}

onMounted(() => {
  toggleColorTheme(colorTheme.value)
})
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive relative group">
      <Tooltip
        :name="t('settings.theme')"
        :side="document_store.show_sidebar_documents ? 'bottom' : 'right'"
        :align="'end'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary group-data-[state=open]:text-primary bg-background size-8"
        >
          <Moon class="transition-all scale-0 rotate-0 size-4 dark:scale-100" />
          <SunMedium class="absolute transition-all rotate-90 size-4 scale-100 dark:scale-0" />
          <span class="sr-only">{{ t("settings.themeDescription") }}</span>
        </span>
        <CornerBottomRight />
      </Tooltip>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="z-10 grid w-64 text-xs font-mono text-foreground bg-background border border-primary"
        :side="props.side"
        :side-offset="5"
        :align="'center'"
      >
        <DropdownMenuGroup class="grid grid-cols-3">
          <DropdownMenuItem
            @click="mode = 'light'"
            class="p-2 text-center hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
          >
            {{ t("settings.light") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="mode = 'dark'"
            class="p-2 text-center hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
          >
            {{ t("settings.dark") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="mode = 'auto'"
            class="p-2 text-center hover:bg-secondary-foreground/10 outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20 focus:ring-inset"
          >
            {{ t("settings.system") }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator class="border-primary/20 border-t" />
        <DropdownMenuLabel
          class="px-3 flex gap-2 pt-2 justify-center text-xs text-center text-foreground/80"
        >
          Primary Color:
          <span class="text-primary">{{ colorTheme }}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup class="flex justify-evenly my-2 gap-0 items-center w-full p-1">
          <DropdownMenuItem
            @click="toggleColorTheme('theme-rose')"
            class="outline-none size-5 bg-rose-500 data-[highlighted]:!opacity-100 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-rose' ?
                ' !ring-primary/80 !bg-primary/10 ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} rose</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="toggleColorTheme('theme-blue')"
            class="bg-blue-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-blue' ?
                ' !ring-primary/80 !bg-primary/10 ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} blue</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="toggleColorTheme('theme-green')"
            class="bg-green-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-green' ?
                ' !ring-primary/80 !bg-primary/10 !ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} green</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="toggleColorTheme('theme-yellow')"
            class="bg-yellow-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-yellow' ?
                ' !ring-primary/80 !bg-primary/10 ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} yellow</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="toggleColorTheme('theme-violet')"
            class="outline-none data-[highlighted]:!opacity-100 size-5 bg-violet-500 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-violet' ?
                ' !ring-primary/80 !bg-primary/10 ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} violet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="toggleColorTheme('theme-foreground')"
            class="!outline-none data-[highlighted]:!opacity-100 size-4 bg-foreground/90 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
            :class="
              colorTheme === 'theme-foreground' ?
                ' !ring-primary/80 !bg-foreground/10 ring-4 !ring-offset-0 !opacity-100'
              : ''
            "
          >
            <span class="sr-only">{{ t("settings.theme") }} Foreground</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
