import { watch } from "vue";

export default function immediateWatch(val: any[], callback: () => void) {
  watch(val, callback, { immediate: true });
}
