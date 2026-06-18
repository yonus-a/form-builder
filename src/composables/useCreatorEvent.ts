import { onScopeDispose } from "vue";

type EventLike<H> = {
  add(handler: H): void;
  remove(handler: H): void;
};

export default function useCreatorEvent<H extends Function>(
  event: EventLike<H>,
  handler: H,
): void {
  event.add(handler);
  onScopeDispose(() => {
    event.remove(handler);
  });
}
