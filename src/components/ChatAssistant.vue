<script setup>
import { useClickOutside } from "../composables/useClickOutside";
import {
  ref,
  computed,
  shallowRef,
  useTemplateRef,
  watch,
  nextTick,
} from "vue";
import { BotMessageSquare, Edit } from "lucide-vue-next";

const emit = defineEmits(["submit"]);

const prefix = `
You are a UI generator for a form builder system.

- Your job is to generate result widgets using pure HTML based on the operator's design description and the test result data.

STRICT OUTPUT RULES:

- Output MUST be a valid JSON object only.
- DO NOT include explanations, comments, markdown, or any extra text.
- DO NOT wrap output in code blocks.
- The response must strictly follow the specified structure.
- If you output anything other than the required JSON, the response is invalid.

OUTPUT FORMAT:
{
  "completedHtmlOnCondition": [
    {
      "expression": "<condition provided or inferred from user request>",
      "html": "<generated HTML այստեղ>"
    }
  ]
}

HTML RULES:

- DO NOT use <html>, <head>, or <body> tags.
- Output ONLY the inner HTML content.
- Use clean and semantic HTML (div, p, h1-h6, span, etc).

STYLING RULES:

- Use ONLY Tailwind CSS classes for styling.
- DO NOT use inline styles.
- DO NOT use <style> tags.
- DO NOT use external CSS.
- DO NOT use id attributes.
- class attribute is allowed ONLY for Tailwind utility classes.

SCRIPTING RULES:

- DO NOT use JavaScript under any circumstances.

STRUCTURE RULES:

- The layout must visually match the operator's requested design (card, minimal, colorful, etc).
- The widget must be responsive using Tailwind utilities (e.g. w-full, max-w-md, flex, grid).

CONTENT RULES:

- Use the provided test result data (score, status, message, etc) and render them clearly.
- Highlight important values (like score or status) visually using Tailwind classes.
- DO NOT copy any text from the user's design description unless explicitly told what text to display.
- Keep the design clean and readable.

CONDITION RULES:

- "expression" must represent the condition mentioned by the operator.
- If no condition is provided, use "true" as default.

FAILSAFE:

- If the request is unclear, return a minimal valid structure with a simple HTML widget.

EXPRESSION RULES (SurveyJS):

- Use {question_name} for values
- Support logical, comparison, and arithmetic operators
- Use functions like:
  - iif()
  - today()
  - dateDiff()
  - sum(), avg(), etc.


Your output is directly rendered in a UI. DO NOT break format.
`;

const isOpen = ref(false);
const containerRef = useTemplateRef("chat-assistant-container");
const textareaRef = useTemplateRef("chatbox");
const fetchData = ref(null);
const isLoading = ref(false);
const prompt = ref("");

const toggleAssistant = async () => {
  isOpen.value = !isOpen.value;
};

const onAfterEnter = () => {
  textareaRef.value?.focus();
};

const handleClick = async () => {
  if (!prompt.value || isLoading.value) return;

  try {
    isLoading.value = true;
    const res = await fetch("http://10.16.0.110:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "glm-4.7-flash:latest",
        prompt: prefix + prompt.value,
        stream: false,
      }),
    });

    const data = await res.json();
    fetchData.value = data;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const handleConfirm = () => {
  emit("submit", data.response);
};

const handleEdit = async () => {
  fetchData.value = null;
  isLoading.value = false;
};
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <span class="text-gray-400 text-sm">Html</span>

    <div class="inline-block relative" ref="chat-assistant-container" dir="rtl">
      <button
        @click="toggleAssistant"
        type="button"
        class="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border-none outline-none group"
        :class="
          isOpen ? 'text-[#2dd4bf]' : 'text-slate-400 hover:text-[#2dd4bf]'
        "
      >
        <BotMessageSquare
          class="w-6 h-6 transition-transform group-active:scale-90"
        />
      </button>

      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="isOpen"
            class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity"
            @click="isOpen = false"
          ></div>
        </Transition>

        <Transition name="pop" @after-enter="onAfterEnter">
          <div>
            <div
              v-if="isOpen && !fetchData"
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

              <button
                :disabled="isLoading"
                class="w-full mt-4 p-4 rounded-xl bg-[#2dd4bf] text-white font-bold hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                @click.prevent="handleClick"
              >
                <span v-if="isLoading">در حال طراحی...</span>
                <span v-else>ایجاد</span>
              </button>
            </div>
            <div
              v-if="isOpen && fetchData"
              class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] md:w-[40%] lg:w-[30%] p-4 rounded-[20px] bg-[#161519] border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div
                v-html="fetchData.response"
                class="w-full flex align-center justify-center h-[40vh] bg-[#27262b] border border-[#1a181e] rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-[#2dd4bf]/30 transition-all resize-y"
              ></div>
              <div class="flex gap-3">
                <button
                  class="w-full mt-4 p-4 rounded-xl bg-[#2dd4bf] text-white font-bold hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  @click.prevent="handleConfirm"
                >
                  ثبت
                </button>
                <button
                  class="w-full mt-4 p-4 rounded-xl bg-[#2dd4bf] text-white font-bold hover:bg-[#26bba8] active:scale-[0.98] transition-all border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  @click.prevent="handleEdit"
                >
                  <Edit class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
