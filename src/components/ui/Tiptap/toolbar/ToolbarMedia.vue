<script setup lang="ts">
import CornerBottomRight from '@/assets/corner-bottom-right.vue'

import DialogImageUrl from '@/components/ui/DialogImageUrl.vue'
import DialogVideoUrl from '@/components/ui/DialogVideoUrl.vue'

import DialogYoutubeUrl from '@/components/ui/DialogYoutubeUrl.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import { useAddImageBase64 } from '@/composables/useAddImageBase64'
import { useSetVideo } from '@/composables/useSetVideo'
import { useEditorStore } from '@/stores/editor'
import { useModalStore } from '@/stores/modal'
import { useSettingsStore } from '@/stores/settings'
import { ImageDown, ImagePlus, Video, Youtube } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  ToolbarButton,
} from 'reka-ui'
import { useI18n } from 'vue-i18n'

const settings = useSettingsStore()
const document = useEditorStore()
const modal = useModalStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()

const { addImageBase64 } = useAddImageBase64(editor)
const { setVideo } = useSetVideo(editor)

function handleImageSubmit(url: string) {
  editor.value?.commands.setMedia({
    'src': url,
    'media-type': 'img',
    'alt': 'Something else',
    'title': 'Something',
    'width': '800',
    'height': '400',
  })
}

function handleYoutubeSubmit(url: string) {
  editor.value.commands.setYoutubeVideo({
    src: url,
    width: Math.max(320, 640),
    height: Math.max(180, 480),
  })
}

function showImageDialog() {
  modal.show_image_url_dialog = true
}

function showYoutubeDialog() {
  modal.show_youtube_url_dialog = true
}
</script>

<template>
  <DropdownMenuRoot>
    <ToolbarButton as-child>
      <DropdownMenuTrigger class="group interactive data-[state=open]:text-primary relative">
        <Tooltip :name="`${t('verb.add')} ${t('toolbar.image')}`" side="bottom">
          <span
            class="flex items-center interactive justify-center outline-none size-8 focus-visible:border-primary border-secondary"
          >
            <ImagePlus class="size-4" />
          </span>
          <span class="sr-only">{{ t("verb.add") }} {{ t("toolbar.image") }}</span>
          <CornerBottomRight />
        </Tooltip>
      </DropdownMenuTrigger>
    </ToolbarButton>
    <DropdownMenuContent
      side="bottom"
      :side-offset="6"
      class="z-50 grid w-40 text-xs gap-1 bg-background border border-primary"
    >
      <DropdownMenuItem
        v-show="!settings.media_base64"
        as-child
        class="relative flex items-center justify-start gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
      >
        <label
          id="uploader"
          class="flex justify-start !pointer-events-none gap-2 p-2 hover:bg-primary"
          for="img-uploader"
        >
          <ImagePlus class="size-4" />
          <span>Base64</span>
          <input
            id="img-uploader"
            type="file"
            accept="image/jpeg"
            class="absolute inset-0 opacity-0"
            :aria-label="`${t('verb.add')} Base64 ${t('toolbar.image')}`"
            @change="addImageBase64"
          >
        </label>
      </DropdownMenuItem>
      <DropdownMenuItem
        v-show="settings.media_base64"
        class="relative flex items-center justify-center text-primary/50 hover:text-primary gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
        @click="settings.toggle_media_base64"
        @select.prevent
      >
        Habilitar Base64
      </DropdownMenuItem>
      <DropdownMenuItem
        class="flex items-center justify-start gap-2 p-2 bg-background outline-none focus-visible:bg-primary/20 hover:bg-primary/20"
        @click="showImageDialog"
      >
        <ImageDown class="size-4" />
        Url
        <span class="sr-only">{{ t("verb.add") }} {{ t("toolbar.image") }} url</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>

  <Tooltip :name="`${t('verb.add')} Youtube video`" side="bottom">
    <ToolbarButton
      class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
      :value="`${t('verb.add')} Youtube video`"
      @click="showYoutubeDialog"
    >
      <Youtube class="size-4" />
      <span class="sr-only">{{ t("verb.add") }} Youtube video</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip name="Video URL" side="bottom">
    <ToolbarButton
      class="flex items-center interactive justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
      value="Video URL"
      @click="setVideo()"
    >
      <Video class="size-4" />
      <span class="sr-only">{{ t("verb.add") }} video URL</span>
    </ToolbarButton>
  </Tooltip>
  <DialogVideoUrl @submit="setVideo" />
  <DialogImageUrl @submit="handleImageSubmit" />
  <DialogYoutubeUrl @submit="handleYoutubeSubmit" />
</template>
