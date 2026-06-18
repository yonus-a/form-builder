<script setup lang="ts">
import { useSurveyCreator } from "../provider/surveyCreator.ts";
import useCreatorToolbarAction from "../composables/useCreatorToolbarAction";
import type { Observation } from "../types/lonic";
import { Locales } from "../types/types";
import Modal from "./Modal.vue";
import { onScopeDispose, ref, watch } from "vue";

const props = defineProps<{
  onStandardSearch: (text: string) => void;
  locale: string | Locales;
  standards: Observation[];
}>();

const isLoading = ref(false);
const isOpen = ref(false);
const search = ref("");

const creator = useSurveyCreator();

useCreatorToolbarAction(creator, {
  id: "standard",
  iconName: "toolbox-dynamicpanel-24x24",
  action: () => {
    isOpen.value = !isOpen.value;
  },
});

let timeout: ReturnType<typeof setTimeout> | null = null;
watch(search, () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    props.onStandardSearch(search.value);
  }, 800);
});

onScopeDispose(() => {
  if (timeout) clearTimeout(timeout);
});

const handleSelect = (item: Observation) => {
  if (item.formSchemaElements) {
    creator.addNewQuestionInPage(
      () => {},
      undefined,
      undefined,
      item.formSchemaElements,
    );
    isOpen.value = false;
  }
};
</script>

<template>
  <Modal v-model="isOpen">
    <div v-if="isOpen" class="modal-container">
      <input
        v-model.trim="search"
        class="search-input"
        placeholder="جستجو کنید..."
        dir="rtl"
      />

      <div v-if="isLoading" class="loading-container">
        <div class="progress-line"></div>
      </div>

      <ul class="items-list">
        <li v-for="item in standards" :key="item.code">
          <button class="item-button" @click.prevent="() => handleSelect(item)">
            {{
              locale === Locales.fa
                ? item.display.fa || item.display.en
                : item.display.en
            }}
          </button>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<style scoped>
.items-list {
  width: 100%;
  height: 40vh;
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
  overflow-y: auto;
  list-style: none;
  padding: 0;
}

.item-button {
  width: 100%;
  border-radius: 0.75rem;
  background-color: #27262b;
  padding: 1rem;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.item-button:hover {
  background-color: #26bba8;
}

.item-button:active {
  transform: scale(0.98);
}

.item-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
