<script setup lang="ts">
import { computed, ref } from "vue";
import FormBuilder from "./components/FormBuilder.vue";
import { provideSurveyConfig } from "./provider/surveyConfig";
import type { AsyncDropdownHandlers, ItemType } from "./types";
import registerAdvancedTextInput from "./utils/registerAdvancedTextInput.ts";
import { ThemeModes, Locales } from "./types/index.ts";

provideSurveyConfig({
  colorMode: ref(ThemeModes.dark),
  locale: ref(Locales.fa),
});

const COUNTRIES: ItemType[] = [
  { value: "IR", text: "Iran" },
  { value: "US", text: "United States" },
  { value: "GB", text: "United Kingdom" },
  { value: "DE", text: "Germany" },
  { value: "FR", text: "France" },
  { value: "IT", text: "Italy" },
  { value: "ES", text: "Spain" },
  { value: "JP", text: "Japan" },
  { value: "CN", text: "China" },
  { value: "IN", text: "India" },
  { value: "BR", text: "Brazil" },
  { value: "CA", text: "Canada" },
  { value: "AU", text: "Australia" },
  { value: "TR", text: "Türkiye" },
  { value: "AE", text: "United Arab Emirates" },
];

const PAGE_SIZE = 5;
const query = ref("");
const currentPage = ref(1);

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim();
  if (!q) return COUNTRIES;
  return COUNTRIES.filter(
    (c) =>
      c.text.toLowerCase().includes(q) || c.value.toLowerCase().includes(q),
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)),
);

const items = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return filtered.value.slice(start, start + PAGE_SIZE);
});

const countryHandlers: AsyncDropdownHandlers = {
  items,
  currentPage,
  totalPages,
  handleSearch: (q) => {
    query.value = q;
    currentPage.value = 1;
  },
  handleNextPage: () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  },
  handlePrevPage: () => {
    if (currentPage.value > 1) currentPage.value--;
  },
  onSelect: (question, item) => {
    question.name = item.value;
    question.title = item.text;
  },
};

registerAdvancedTextInput("countryAsync", countryHandlers);

const json = ref<object>({});
</script>

<template>
  <FormBuilder v-model:json="json" />
</template>
