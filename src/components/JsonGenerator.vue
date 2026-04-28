<script setup lang="ts">
import useSurveyCreator from "../composables/useSurveyCreator";
import type { SurveyCreatorModel } from "survey-creator-core";
import { ref, useTemplateRef } from "vue";
import { Action } from "survey-core";
import Modal from "./Modal.vue";

const props = defineProps<{
  onGenerateBtnClick: (prompt: string) => SurveyCreatorModel["JSON"];
}>();

const textareaRef = useTemplateRef("chatbox");
const isLoading = ref(false);
const isOpen = ref(false);
const prompt = ref("");

const creator = useSurveyCreator();

const chatAiAction = new Action({
  id: "chat-ai",
  iconName: "pg-specific-24x24",
  action: () => {
    isOpen.value = !isOpen.value;
  },
});

creator.toolbar.actions.push(chatAiAction);

const onAfterEnter = () => {
  textareaRef.value?.focus();
};

const handleClick = async () => {
  if (!prompt.value || isLoading.value) return;

  try {
    isLoading.value = true;
    const schema = await props.onGenerateBtnClick(prompt.value);
    creator.JSON = schema;
  } catch (error) {
  } finally {
    isLoading.value = false;
    isOpen.value = false;
  }
};
</script>

<template>
  <Modal v-model="isOpen" @after-enter="onAfterEnter">
    <div
      v-if="isOpen"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] md:w-[40%] lg:w-[30%] p-4 rounded-[20px] bg-[#161519] border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <textarea
        rows="12"
        v-model="prompt"
        placeholder="لطفا دستور طراحی خود را وارد کنید..."
        class="w-full bg-[#27262b] border border-[#1a181e] rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#2dd4bf]/30 transition-all resize-y"
        ref="chatbox"
      ></textarea>

      <div
        v-if="isLoading"
        class="w-full h-1 bg-[#27262b] rounded-full mt-4 overflow-hidden"
      >
        <div class="progress-line h-full bg-[#2dd4bf]"></div>
      </div>
      <div class="flex gap-2 items-align-center mt-4">
        <button
          :disabled="isLoading"
          class="w-full p-4 rounded-xl bg-[#2dd4bf] text-white font-bold hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          @click.prevent="handleClick"
        >
          <span v-if="isLoading">در حال طراحی...</span>
          <span v-else>ایجاد</span>
        </button>
      </div>
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
