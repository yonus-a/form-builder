<script setup lang="ts">
import type { AdvancedTextInput, ItemType } from "../types";
import { computed, ref, type Ref } from "vue";
import type { Question } from "survey-core";

defineOptions({ inheritAttrs: false });

type PopupModelLike = { isVisible: boolean };

const props = defineProps<{
  model: {
    question: Question;
    handlers: AdvancedTextInput;
    selected: Ref<ItemType | null>;
    popupModel: PopupModelLike;
    onItemSelected: (item: ItemType) => void;
  };
}>();

const handlers = computed(() => props.model.handlers);
const question = computed(() => props.model.question);
const selected = computed(() => props.model.selected.value);

const items = computed<ItemType[]>(() => handlers.value.items.value);
const currentPage = computed(() => handlers.value.currentPage.value);
const totalPages = computed(() => handlers.value.totalPages.value);

const searchValue = ref("");

function onSearchInput(e: Event) {
  const query = (e.target as HTMLInputElement).value;
  searchValue.value = query;
  handlers.value.handleSearch(query);
}

function onSelect(item: ItemType) {
  props.model.onItemSelected(item);
  handlers.value.onSelect?.(question.value, item);
  props.model.popupModel.isVisible = false;
}

function onNext() {
  if (currentPage.value >= totalPages.value) return;
  handlers.value.handleNextPage();
}

function onPrev() {
  if (currentPage.value <= 1) return;
  handlers.value.handlePrevPage();
}
</script>

<template>
  <div class="advanced-text-input-popup sv-list__container sd-list">
    <div class="advanced-text-input-popup__search">
      <input
        type="text"
        class="sd-input"
        :value="searchValue"
        @input="onSearchInput"
        placeholder="Search..."
        autocomplete="off"
      />
    </div>
    <div class="sv-list__empty-container" v-if="!items.length">
      <div class="sv-list__empty-text" aria-label="No data to display">
        No data to display
      </div>
    </div>
    <ul v-else class="sv-list" role="listbox">
      <li
        role="option"
        class="sv-list__item sd-list__item sv-list__item-text--wrap"
        :class="{ 'sv-list__item--selected': selected?.value === choice.value }"
        :aria-selected="selected?.value === choice.value ? 'true' : 'false'"
        v-for="choice in items"
        :key="choice.value"
        tabindex="-1"
        @mousedown.prevent="onSelect(choice)"
      >
        <div
          style="--sjs-list-item-level: 1"
          class="sv-list__item-body sd-list__item-body"
          :title="choice.text"
        >
          <span class="sv-string-viewer">{{ choice.text }}</span>
        </div>
      </li>
    </ul>
    <div class="advanced-text-input-popup__pagination" v-if="totalPages > 0">
      <button
        class="sd-editor-button-item"
        :disabled="currentPage <= 1"
        type="button"
        @mousedown.prevent="onPrev"
      >
        &lsaquo;
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="sd-editor-button-item"
        :disabled="currentPage >= totalPages"
        type="button"
        @mousedown.prevent="onNext"
      >
        &rsaquo;
      </button>
    </div>
  </div>
</template>

<style scoped>
.advanced-text-input-popup__search {
  padding: 8px;
  border-bottom: 1px solid var(--sjs-border-default, rgba(0, 0, 0, 0.1));
}

.advanced-text-input-popup__search input {
  width: 100%;
  box-sizing: border-box;
}

.advanced-text-input-popup__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid var(--sjs-border-default, rgba(0, 0, 0, 0.1));
}

.advanced-text-input-popup__pagination button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 12px;
  font-size: 16px;
}

.advanced-text-input-popup__pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
