<script setup lang="ts">
import { CircleOff } from "lucide-vue-next"
import { useDatabaseStore } from "@/stores/database"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const { t } = useI18n()
const db_store = useDatabaseStore()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

function toggleCheck(item, isChecked) {
  db_store.change_document_checked(item, isChecked)
}
</script>

<template>
  <div
    class="z-20 flex items-center justify-between w-full pr-3 min-h-8 md:pr-2 opacity-70"
  >
    <span
      class="flex py-0.5 ml-1 rounded-full w-full items-center outline-none justify-start gap-2 text-sm text-left focus-within:ring-1 ring-primary"
      :class="db_store.loaded_id === props.data?.id ? 'text-primary' : ''"
    >
      <p
        class="@sm:max-w-full max-w-80 py-1 md:py-0 line-clamp-1 line-through decoration-wavy decoration-primary/50 text-foreground/50 decoration-1"
      >
        {{ props.data?.document_data.name }}
      </p>
    </span>

    <Tooltip :name="t('sidebar.markAsUndone')">
      <span>
        <label :for="'itemcompleted-' + props.data?.id" class="">
          <input
            type="checkbox"
            required
            class="sr-only peer"
            @change="toggleCheck(props.data, $event.target.checked)"
            :id="'itemcompleted-' + props.data?.id"
            :checked="props.data?.document_data.checked"
            :aria-label="t('sidebar.markAsUndone')"
          />
          <div
            class="peer-focus:outline-none items-center size-7 md:size-6 flex justify-center rounded-full relative z-[50] mr-0.5 peer-focus:ring-1 peer-focus:ring-primary dark:peer-focus:ring-primary hover:ring-1 hover:ring-primary"
          >
            <CircleOff class="size-5 md:size-4" />
          </div>

          <span class="sr-only">{{ t("sidebar.markAsUndone") }}</span>
        </label>
      </span>
    </Tooltip>
  </div>
</template>
