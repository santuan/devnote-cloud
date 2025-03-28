<template>
  <node-view-wrapper class="code-block group" spellcheck="false">
    <ScrollAreaRoot class="w-full h-full" style="--scrollbar-size: 10px">
      <ScrollAreaViewport class="w-full" :class="showFullCode ? 'h-full' : 'max-h-[600px]'">
        <div ref="codeHeight" spellcheck="false">
          <pre><code class="text-xs leading-6 break-all"><node-view-content /></code></pre>
        </div>
        <!-- <div
          v-show="!showFullCode && height > 600"
          class="absolute bottom-0 left-0 right-0 z-10 h-16 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#1f2937] dark:to-[#060504]"
        /> -->
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        class="flex select-none z-20 touch-none p-0.5 bg-secondary transition-colors ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollAreaThumb
          class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
        />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
    <div
      class="absolute top-0 right-0 z-40 flex items-center justify-end gap-1 -translate-x-1 translate-y-1"
    >
      <RadixVirtual v-model="selectedLanguage" :items="languages" />
      <button
        class="print:hidden flex items-center justify-center size-6 bg-secondary shrink-0"
        :class="copyText === 'Copied' ? '!bg-primary' : ''"
        @click="copyToClipboard()"
      >
        <ClipboardCheck v-show="copyText === 'Copied'" class="size-4 text-primary-foreground" />
        <Clipboard v-show="copyText !== 'Copied'" class="size-4" />
        <span class="sr-only">Copy to clipboard</span>
      </button>
      <button
        class="flex items-center justify-center duration-100 size-6 bg-secondary shrink-0"
        v-if="height > 600"
        @click="showFullCode = !showFullCode"
      >
        <FoldVertical v-if="showFullCode" class="size-4" />
        <UnfoldVertical v-else class="size-4" />
      </button>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3"
import { bundledLanguages } from "shiki/bundle/web"
import RadixVirtual from "@/components/ui/Tiptap/RadixVirtual.vue"
import { Clipboard, ClipboardCheck, FoldVertical, UnfoldVertical } from "lucide-vue-next"
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"
import { useElementSize } from "@vueuse/core"
import { shallowRef } from "vue"

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    RadixVirtual,
    Clipboard,
    ClipboardCheck,
    UnfoldVertical,
    FoldVertical,
    ScrollAreaRoot,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  },

  props: nodeViewProps,

  data() {
    return {
      languages: Object.keys(bundledLanguages),
      copyText: "Copy",
      showFullCode: false,
    }
  },

  setup() {
    const codeHeight = shallowRef(null)
    const { width, height } = useElementSize(codeHeight)
    return {
      codeHeight,
      width,
      height,
    }
  },

  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({ language })
      },
    },
  },
  methods: {
    copyToClipboard(successful = () => null, failure = () => null) {
      const clipboard = navigator.clipboard
      const value = this.node.content.content[0].text
      if (clipboard !== undefined) {
        navigator.clipboard.writeText(value).then(successful, failure)
        this.copyText = "Copied"
      } else {
        if (document.execCommand) {
          const el = document.createElement("textarea")
          el.value = value
          document.body.append(el)
          el.select()
          el.setSelectionRange(0, value.length)
          if (document.execCommand("copy")) {
            this.copyText = "Copied" // popper?
          }
          el.remove()
        } else {
          this.copyText = "Error!"
          alert("Error!")
        }
      }
      setTimeout(() => {
        this.copyText = "copy"
      }, 1000)
    },
  },
}
</script>

<style>
.tiptap .code-block {
  position: relative;
  margin: 1rem 0;
}

.tiptap .code-block [data-reka-scroll-area-viewport] {
  @apply duration-100 border border-primary/5 outline-none;
}

.tiptap .code-block [data-reka-scroll-area-viewport]:hover {
  @apply border border-primary/50;
}

.tiptap .code-block [data-reka-scroll-area-viewport]:focus,
.tiptap .code-block [data-reka-scroll-area-viewport]:focus-within {
  @apply ring-2 ring-primary;
}

.tiptap .code-block pre {
  @apply rounded-none;
}

.tiptap .code-block pre code div {
  @apply pt-4 p-3;
}

.tiptap .code-block pre code * {
  @apply !select-text;
}

.is-preview * {
  @apply !select-text;
}

@media print {
  .tiptap .code-block {
    @apply !ml-[0.1125rem];
  }

  .tiptap .code-block pre code div {
    @apply p-0;
  }

  .tiptap .code-block [data-reka-scroll-area-viewport] {
    @apply !border !ring-0 !border-foreground/20 !outline-none;
  }
  .tiptap .code-block span {
    filter: brightness(0.5);
  }
}
</style>
