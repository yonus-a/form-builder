<script setup lang="ts">
const show = defineModel();

defineProps<{
  onAfterEnter?: (el: Element) => void;
}>();
</script>

<template>
  <div>
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity"
        @click="show = false"
      ></div>
    </Transition>

    <Transition name="pop" @after-enter="onAfterEnter">
      <slot> </slot>
    </Transition>
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
</style>
