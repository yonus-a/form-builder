<script setup lang="ts">
import { ref, computed } from "vue";
import type { Choice } from "../types/lonic";

const props = withDefaults(
  defineProps<{
    choices: Choice[];
    pageSize?: number;
    searchable?: boolean;
    placeholder?: string;
    modelValue?: string;
    labelPrev?: string;
    labelNext?: string;
    labelEmpty?: string;
  }>(),
  {
    pageSize: 10,
    searchable: false,
    placeholder: "",
    modelValue: "",
    labelPrev: "قبلی",
    labelNext: "بعدی",
    labelEmpty: "موردی یافت نشد",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const searchQuery = ref("");
const currentPage = ref(1);

const filteredChoices = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.choices;
  }
  const query = searchQuery.value.toLowerCase();
  return props.choices.filter(
    (c) =>
      c.text.toLowerCase().includes(query) ||
      c.value.toLowerCase().includes(query)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredChoices.value.length / props.pageSize))
);

const pagedChoices = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  return filteredChoices.value.slice(start, start + props.pageSize);
});

function onSearch() {
  currentPage.value = 1;
}

function selectChoice(value: string) {
  emit("update:modelValue", value);
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

<template>
  <div class="paginated-dropdown">
    <input
      v-if="searchable"
      v-model="searchQuery"
      class="paginated-dropdown__search"
      type="text"
      :placeholder="placeholder || '...'"
      @input="onSearch"
    />

    <ul class="paginated-dropdown__list" role="listbox">
      <li
        v-for="choice in pagedChoices"
        :key="choice.value"
        class="paginated-dropdown__item"
        :class="{ 'paginated-dropdown__item--selected': modelValue === choice.value }"
        role="option"
        :aria-selected="modelValue === choice.value"
        @click="selectChoice(choice.value)"
      >
        {{ choice.text }}
      </li>
      <li v-if="pagedChoices.length === 0" class="paginated-dropdown__empty">
        {{ labelEmpty }}
      </li>
    </ul>

    <div class="paginated-dropdown__pagination">
      <button
        class="paginated-dropdown__btn"
        :disabled="currentPage <= 1"
        @click="prevPage"
      >
        {{ labelPrev }}
      </button>
      <span class="paginated-dropdown__page-info">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        class="paginated-dropdown__btn"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        {{ labelNext }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.paginated-dropdown {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  direction: rtl;
}

.paginated-dropdown__search {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  margin-bottom: 6px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  direction: rtl;
}

.paginated-dropdown__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 240px;
  overflow-y: auto;
}

.paginated-dropdown__item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s;
}

.paginated-dropdown__item:hover {
  background: #f3f4f6;
}

.paginated-dropdown__item--selected {
  background: #dbeafe;
  font-weight: 600;
}

.paginated-dropdown__empty {
  padding: 8px 12px;
  color: #9ca3af;
  font-size: 13px;
}

.paginated-dropdown__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;
}

.paginated-dropdown__btn {
  padding: 4px 14px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #f9fafb;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s;
}

.paginated-dropdown__btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.paginated-dropdown__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.paginated-dropdown__page-info {
  font-size: 13px;
  color: #6b7280;
}
</style>
