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
import { SunMedium, Moon } from "lucide-vue-next"
import { useColorMode } from "@vueuse/core"
import { useToggleColorTheme } from "@/composables/useToggleColorTheme"
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

const mode = useColorMode()
const { t } = useI18n()

</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="interactive relative group">
      <Tooltip
        :name="t('settings.theme')"
        :align="'end'"
      >
        <span
          class="flex items-center justify-center border hover:bg-secondary/80 border-secondary group-data-[state=open]:text-primary bg-background size-8"
        >
          <Moon class="scale-0 rotate-0 size-4 dark:scale-100" />
          <SunMedium class="absolute rotate-90 size-4 scale-100 dark:scale-0" />
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
        v-memo="[mode]"
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
        {{ t("settings.selectPrimaryColor") }}
        </DropdownMenuLabel>
        <DropdownMenuGroup class="flex justify-evenly my-2 gap-0 items-center w-full p-1">
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-rose')"
            class="outline-none size-5 bg-rose-500 data-[highlighted]:!opacity-100 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} rose</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-blue')"
            class="bg-blue-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} blue</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-green')"
            class="bg-green-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} green</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-yellow')"
            class="bg-yellow-500 outline-none data-[highlighted]:!opacity-100 size-5 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} yellow</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-violet')"
            class="outline-none data-[highlighted]:!opacity-100 size-5 bg-violet-500 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} violet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="useToggleColorTheme('theme-foreground')"
            class="!outline-none data-[highlighted]:!opacity-100 size-4 bg-foreground/90 hover:ring-4 focus-visible:ring-4 ring-foreground ring-offset-0 opacity-30"
          >
            <span class="sr-only">{{ t("settings.theme") }} Foreground</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
