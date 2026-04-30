<script setup lang="ts">
const show = defineModel();

defineProps<{
  onAfterEnter?: (el: Element) => void;
}>();
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="backdrop" @click="show = false"></div>
  </Transition>
  <Transition name="pop" @after-enter="onAfterEnter">
    <slot> </slot>
  </Transition>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9998;
  background-color: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

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
