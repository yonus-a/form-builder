import type { Ref } from "vue";

export type ItemType = { value: string; text: string };

export interface AsyncDropdownHandlers {
  items: Ref<ItemType[]>;
  currentPage: Ref<number>;
  totalPages: Ref<number>;
  handleSearch: (query: string) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}
