export type ItemType = { value: string; text: string };

export interface AsyncDropdownHandlers {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleSearch: () => void;
  currentPage: number;
  totalPages: number;
  items: ItemType[];
}
