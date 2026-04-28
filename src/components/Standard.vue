<script setup lang="ts">
import useSurveyCreator from "../composables/useSurveyCreator";
import type { Observation } from "../types/lonic";
import { Locales } from "../types/types";
import { Action } from "survey-core";
import Modal from "./Modal.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  onStandardSearch: (text: string) => void;
  locale: string | Locales;
  standards: Observation[];
}>();

const isLoading = ref(false);
const isOpen = ref(false);
const search = ref("");

const creator = useSurveyCreator();

const standardAction = new Action({
  id: "standard",
  iconName: "toolbox-dynamicpanel-24x24",
  action: () => {
    isOpen.value = !isOpen.value;
  },
});

let timeout = null;
watch(search, () => {
  clearTimeout(timeout!);
  timeout = setTimeout(() => {
    props.onStandardSearch(search.value);
  }, 800);
});

creator.toolbar.actions.push(standardAction);

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
    <div
      v-if="isOpen"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] md:w-[40%] lg:w-[30%] p-4 rounded-[20px] bg-[#161519] border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <input
        v-model.trim="search"
        class="w-full bg-[#27262b] border border-[#1a181e] direction-rtl rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#2dd4bf]/30 transition-all resize-y"
        placeholder="جستجو کنید..."
        dir="rtl"
      />

      <div
        v-if="isLoading"
        class="w-full h-1 bg-[#27262b] rounded-full mt-4 overflow-hidden"
      >
        <div class="progress-line h-full bg-[#2dd4bf]"></div>
      </div>

      <ul class="w-full h-[40vh] grid gap-3 mt-6 overflow-y-scroll">
        <li v-for="item in standards" :key="item.code">
          <button
            class="rounded-xl w-full bg-[#27262b] p-4 text-white hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="() => handleSelect(item)"
          >
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
.progress-line {
  width: 30%;
  animation: loading-animation 1.5s infinite ease-in-out;
}

@keyframes loading-animation {
  0% {
    transform: translateX(350%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
