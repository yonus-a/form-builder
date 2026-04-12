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
import { BotMessageSquare } from "lucide-vue-next";
import { JsonPrefix, UiPrefix } from "../utils/prefixPrompts";

const props = defineProps({
  defaultValue: String,
  onUpdate: Function,
});

const textareaRef = useTemplateRef("chatbox");
const isLoading = ref(false);
const fetchData = ref(null);
const isOpen = ref(false);
const prompt = ref("");
const mode = ref(0);

const toggleGenerator = async () => {
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
        model: "gpt-oss:120b",
        prompt: [JsonPrefix, UiPrefix][mode] + prompt.value,
        stream: false,
      }),
    });

    const data = await res.json();
    props.onUpdate(data.response);
  } catch (error) {
  } finally {
    isLoading.value = false;
    isOpen.value = false;
  }
};
</script>

<template>
  <button
    @click="toggleGenerator"
    type="button"
    class="fixed z-[9998] bottom-[40px] right-[10px] bg-[#2dd4bf] p-2 cursor-pointer flex items-center justify-center rounded-full transition-all duration-200 border-none outline-none group"
    :class="isOpen ? 'text-[#2dd4bf]' : 'text-slate-400 hover:text-[#2dd4bf]'"
  >
    <BotMessageSquare
      class="w-6 h-6 text-black transition-transform group-active:scale-90"
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
            <div class="max-w-sm mx-auto">
              <select
                class="w-full bg-[#27262b]! text-sm text-white px-4 py-4 border-none border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                v-model="mode"
              >
                <option value="0">ساخت فرم</option>
                <option value="1">ساخت نتیجه نظرسنجی</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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
