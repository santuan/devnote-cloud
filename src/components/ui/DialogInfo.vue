<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "reka-ui"

import { useI18n } from "vue-i18n"
import { useModalStore } from "@/stores/modal"
import { ArrowDown, ArrowUp, Info, X } from "lucide-vue-next"
import Tooltip from "./Tooltip.vue"
import { useDocumentStore } from "@/stores/document"
const document = useDocumentStore()

const modal = useModalStore()
const { t, locale } = useI18n()
</script>

<template>
  <DialogRoot v-model:open="modal.show_info">
    <Tooltip
      :name="t('sidebar.about')"
      :align="document.show_sidebar_documents ? 'end' : 'center'"
      :side="document.show_sidebar_documents ? 'bottom' : 'right'"
    >
      <DialogTrigger
        class="flex items-center justify-center border interactive border-secondary hover:bg-secondary/80 bg-background size-8"
      >
        <Info class="size-4" />
        <span class="sr-only">{{ t("sidebar.about") }}</span>
      </DialogTrigger>
    </Tooltip>
    <DialogPortal>
      <DialogOverlay class="bg-background/95 fixed inset-0 z-[60]" />
      <DialogContent
        class="font-mono fixed top-6 md:top-[50%] left-[50%] border border-secondary max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] md:translate-y-[-50%] bg-background rounded p-4 focus:outline-none z-[100]"
      >
        <DialogTitle class="text-foreground m-0 text-sm pt-1 font-semibold">
          {{ t("sidebar.about") }}
        </DialogTitle>
        <ScrollAreaRoot
          class="w-full border h-[65vh] mt-6 md:h-[68vh] border-secondary select-interactive"
          style="--scrollbar-size: 10px"
        >
          <ScrollAreaViewport class="w-full h-full">
            <template v-if="locale === 'es'">
              <article
                class="max-w-full p-3 mx-auto prose prose-ul:list-none prose-ul:pl-0 dark:prose-invert"
              >
                <DialogDescription
                  class="inline-block p-3 mt-3 mb-3 text-sm leading-normal rounded text-foreground bg-primary/20"
                >
                  Esto es una beta, no utilizar más que para realizar pruebas.
                </DialogDescription>
                <p class="mt-3 mb-5 text-sm leading-normal text-foreground !select-text">
                  Esta aplicación usa la tecnologia
                  <a
                    href="https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API/Using_IndexedDB"
                    class="underline underline-offset-2"
                    >IndexedDB</a
                  >
                  que existe dentro en los navegadores para almacenar datos. Estos datos quedan
                  almacenados en la sesión de ese navegador (Al limpiar los datos del navegador
                  estos se perderán).
                </p>
                <p class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                  Puede exportar e importar la IndexedDB en formato JSON y asi mantener la base de
                  datos localmente.
                </p>
                <h3 class="text-sm">Atajos de teclado</h3>
                <ul class="text-xs">
                  <li>
                    <p><code>Ctrl Alt N</code> Crear nuevo documento</p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt P</code> Alternar entre modo editar o previsualizar</p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt O</code> Barra de comandos para navegar documentos</p>
                  </li>
                  <li>
                    <p><code>Ctrl M</code> Colapsar el menú</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift Alt S</code> Mostrar configuraciones</p>
                  </li>
                  <li>
                    <p>
                      <code class="inline-flex gap-1">Ctrl Shift &uarr;</code>
                      Seleccionar documento anterior.
                    </p>
                  </li>
                  <li>
                    <p>
                      <code class="inline-flex gap-1">Ctrl Shift &darr; </code>
                      Seleccionar documento siguiente.
                    </p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt .</code> Expande el editor de texto a todo el ancho</p>
                  </li>
                  <li>
                    <p><code>Shift Delete</code> Eliminar documento en curso</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift Alt &larr;</code> Saltar al menú</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift Alt &rarr;</code> Saltar al titulo actual</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift Alt E</code> Saltar al editor de texto</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift +</code> Incrementar tamaño app. Solo teclado númerico</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift -</code> Disminuir tamaño app. Solo teclado númerico</p>
                  </li>
                </ul>
              </article>
            </template>
            <template v-else>
              <article
                class="max-w-full p-3 mx-auto prose prose-ul:list-none prose-ul:pl-0 dark:prose-invert"
              >
                <DialogDescription
                  class="inline-block p-3 mt-3 mb-3 text-sm leading-normal rounded text-foreground bg-primary/20"
                >
                  This is an beta version; use it only for testing purposes. Currently adapting to
                  work well with <a href="https://nvda.es/">NVDA</a>.
                </DialogDescription>
                <p class="mt-3 mb-5 text-sm leading-normal text-foreground !select-text">
                  This application uses
                  <a
                    href="https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API/Using_IndexedDB"
                    class="underline underline-offset-2"
                    >IndexedDB</a
                  >
                  technology within browsers to store data. These data are saved in the session of
                  that browser (they will be lost when clearing the browser data).
                </p>
                <p class="mt-2 mb-5 text-sm leading-normal text-foreground !select-text">
                  You can export and import the IndexedDB in JSON format to keep the database
                  locally.
                </p>
                <h3 class="text-sm">Keyboard Shortcuts</h3>
                <ul class="text-xs">
                  <li>
                    <p><code>Ctrl Alt N</code> Create new document</p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt P</code> Toggle between edit or preview mode</p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt O</code> Command bar to navigate documents</p>
                  </li>
                  <li>
                    <p><code>Ctrl M</code> Collapse the menu</p>
                  </li>
                  <li>
                    <p><code>Ctrl Shift Alt S</code> Show settings</p>
                  </li>
                  <li>
                    <p>
                      <code class="inline-flex gap-1">Ctrl Shift &uarr;</code> Select previous
                      document.
                    </p>
                  </li>
                  <li>
                    <p>
                      <code class="inline-flex gap-1">Ctrl Shift &darr;</code>
                      Select next document.
                    </p>
                  </li>
                  <li>
                    <p><code>Ctrl Alt .</code> Expand/Collapse the editing area</p>
                  </li>
                  <li>
                    <p><code>Shift Delete</code> Delete current document</p>
                  </li>
                  <li>
                    <p><code>ctrl shift alt &uarr;</code> Toogle editor typography options</p>
                  </li>
                  <li>
                    <p><code>ctrl shift alt &larr;</code> Focus on sidebar</p>
                  </li>
                  <li>
                    <p><code>ctrl shift alt &rarr;</code> Focus on title</p>
                  </li>
                  <li>
                    <p><code>ctrl shift alt &darr;</code> Focus on editor</p>
                  </li>
                  <li>
                    <p><code>ctrl shift +</code> Increase App size. Numbpad only</p>
                  </li>
                  <li>
                    <p><code>ctrl shift -</code> Decrease App size. Numbpad only</p>
                  </li>
                </ul>
              </article>
            </template>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
            class="flex select-none touch-none p-0.5 bg-secondary ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollAreaThumb
              class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
        <div class="flex justify-end mt-2 md:mt-3">
          <DialogClose as-child>
            <button
              class="bg-secondary text-foreground hover:bg-background hover:ring-2 hover:ring-foreground text-sm focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:outline-2 focus:outline-foreground focus:outline-dashed focus:outline-offset-4"
            >
              Cerrar ventana
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="absolute inline-flex items-center justify-center appearance-none top-4 text-foreground hover:bg-secondary/80 right-3 size-7 focus:shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:text-primary"
        >
          <X />
          <span class="sr-only">{{ t("verb.close") }}</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
code {
  @apply bg-primary/20 break-all px-1 mx-0.5 rounded py-0.5 text-foreground ring-1 ring-primary/30 font-light text-sm;
}

code::after,
code::before {
  display: none;
}
</style>
