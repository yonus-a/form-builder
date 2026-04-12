<script setup>
import { useClickOutside } from "../composables/useClickOutside";
import { ref, computed, shallowRef, useTemplateRef } from "vue";
import * as LucideIcons from "lucide-vue-next";

const props = defineProps({
  defaultValue: String,
});

const emit = defineEmits(["select"]);

const search = ref("");
const isOpen = ref(false);
const selectedIconName = ref(props.defaultValue);
const containerRef = useTemplateRef("icon-picker-container");

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

const togglePicker = () => (isOpen.value = !isOpen.value);

const selectIcon = (name) => {
  selectedIconName.value = name;
  isOpen.value = false;
  emit("select", name);
};

useClickOutside(containerRef, () => (isOpen.value = false));
</script>

<template>
  <div class="icon-picker" ref="icon-picker-container" dir="rtl">
    <button
      @click="togglePicker"
      class="trigger-btn"
      :class="{ 'is-active': selectedIconName }"
      type="button"
    >
      <component
        :is="ALL_ICONS[selectedIconName] || ALL_ICONS.Image"
        class="w-6 h-6"
      />
    </button>
    <Transition name="pop">
      <div v-if="isOpen" class="picker-modal">
        <div class="picker-header">
          <input
            v-model.trim="search"
            class="search-input"
            placeholder="جستجوی آیکون..."
            autofocus
          />
        </div>

        <div class="icon-grid custom-scrollbar">
          <button
            v-for="[name, IconComp] in filteredIcons"
            :key="name"
            @click="selectIcon(name)"
            :class="['icon-item', { 'is-selected': selectedIconName === name }]"
            :title="name"
          >
            <component :is="IconComp" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.icon-picker {
  --primary: #2dd4bf;
  --bg-dark: #1c1b20;
  --border: rgba(255, 255, 255, 0.1);
  display: inline-block;
  position: relative;
}

.trigger-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.trigger-btn.is-active {
  color: var(--primary);
  border-color: var(--primary);
}

.picker-modal {
  position: fixed;
  width: 320px;
  background: rgba(28, 27, 32, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px;
  z-index: 9999;
  box-shadow: 0 0 0 10000px rgba(0, 0, 0, 0.5);
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  background: #0f1115;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 1em;
}

.search-input:focus {
  border-color: rgba(45, 212, 191, 0.4);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
  padding: 8px 4px;
}

.icon-item {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  color: #64748b;
  cursor: pointer;
}

.icon-item:hover,
.icon-item.is-selected {
  background: rgba(45, 212, 191, 0.15);
  color: var(--primary);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.9);
}
</style>
