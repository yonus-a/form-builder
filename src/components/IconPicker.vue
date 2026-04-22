<script setup lang="ts">
import useSurveyCreator from "../composables/useSurveyCreator";
import { ref, computed, shallowRef } from "vue";
import * as LucideIcons from "lucide-vue-next";
import Modal from "./Modal.vue";

const search = ref("");
const isOpen = ref(false);

const creator = useSurveyCreator();

creator.survey.onAfterRenderHeader.add((_, options) => {
  const logoPicker: HTMLElement | null = options.htmlElement?.children?.[1];
  if (logoPicker) {
    // remove file input
    const fileInput = logoPicker.firstChild;
    if (fileInput) logoPicker.removeChild(fileInput);

    logoPicker.addEventListener("click", (e) => {
      e.preventDefault();
      isOpen.value = !isOpen.value;
    });
  }
});

const ALL_ICONS = shallowRef(LucideIcons);
const filteredIcons = computed(() => {
  const query = search.value.toLowerCase();
  return Object.entries(ALL_ICONS.value)
    .filter(
      ([name, component]) =>
        typeof component !== "undefined" && name.toLowerCase().includes(query),
    )
    .slice(0, 80);
});

const selectIcon = (name: string) => {
  creator.survey.icon = name;
  isOpen.value = false;
};
</script>

<template>
  <Modal v-model="isOpen">
    <div
      v-if="isOpen"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] md:w-[40%] lg:w-[30%] p-4 rounded-[20px] bg-[#161519] border border-white/10 backdrop-blur-xl shadow-2xl"
      dir="rtl"
    >
      <input
        v-model.trim="search"
        class="w-full bg-[#27262b] border border-[#1a181e] rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#2dd4bf]/30 transition-all resize-y"
        placeholder="جستجوی آیکون..."
        autofocus
      />
      <div
        class="grid grid-cols-8 gap-y-3 max-h-[40vh] overflow-y-scroll mt-6 justify-items-center"
      >
        <button
          v-for="[name, IconComp] in filteredIcons"
          @click="selectIcon(name)"
          class="rounded-xl bg-[#27262b] p-4 text-white hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          :title="name"
          :key="name"
        >
          <component :is="IconComp as Object" />
        </button>
      </div>
    </div>
  </Modal>
</template>
