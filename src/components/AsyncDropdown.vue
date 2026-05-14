<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  inheritAttrs: false,
});

const show = ref(false);
const props = defineProps<{ question: any }>();
const handlers = props.question.handlers;
</script>

<template>
  <div class="sd-selectbase">
    <div class="sv-dropdown_select-wrapper">
      <div class="sd-input sd-dropdown sd-dropdown--empty" ref="inputRef">
        <div class="sd-dropdown__value">
          <input
            type="text"
            class="sd-dropdown__filter-string-input"
            :aria-expanded="show ? 'true' : 'false'"
            @input="handlers?.handleSearch"
            placeholder="Select..."
            @focus="show = true"
            @blur="show = false"
            aria-required="false"
            aria-invalid="false"
            autocomplete="off"
            inputmode="text"
            role="combobox"
          />
        </div>
        <div
          class="sv-action-bar sv-action-bar--default-size-mode sd-dropdown-action-bar"
        >
          <div class="sv-action sd-editor-chevron-button">
            <div class="sv-action__content">
              <button
                class="sd-editor-button-item"
                :class="[show && 'sd-editor-button-item--pressed']"
                type="button"
                title="Select"
                role="button"
                tabindex="-1"
              >
                <svg
                  class="sv-svg-icon sv-editor-button-item__icon"
                  role="presentation"
                >
                  <use xlink:href="#icon-chevrondown-24x24"></use>
                  <title>Select</title>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          tabindex="-1"
          class="sv-popup sv-dropdown-popup sv-single-select-list sv-popup--menu-popup sv-popup--bottom"
          v-if="show"
        >
          <div class="sv-popup__container">
            <div class="sv-popup__body-content">
              <div class="sv-popup__scrolling-content">
                <div class="sv-popup__content">
                  <div class="sv-list__container sd-list">
                    <div
                      class="sv-list__empty-container"
                      v-if="!handlers?.items?.length"
                    >
                      <div
                        class="sv-list__empty-text"
                        aria-label="No data to display"
                      >
                        No data to display
                      </div>
                    </div>
                    <ul v-else class="sv-list" role="listbox">
                      <li
                        role="option"
                        class="sv-list__item sd-list__item sv-list__item-text--wrap"
                        v-for="choice in handlers?.items"
                        aria-selected="false"
                        tabindex="-1"
                      >
                        <div
                          style="--sjs-list-item-level: 1"
                          class="sv-list__item-body sd-list__item-body"
                          title="Item 1"
                        >
                          <span class="sv-string-viewer">
                            {{ choice.text }}
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div class="pagination">
                      <button
                        class="sd-editor-button-item sd-editor-button-item--pressed"
                        @click="handlers?.handleNextPage"
                      >
                        <svg
                          class="sv-svg-icon sv-editor-button-item__icon"
                          role="presentation"
                        >
                          <use xlink:href="#icon-chevronleft-24x24"></use>
                          <title>Next</title>
                        </svg>
                      </button>
                      <span
                        >{{ handlers?.currentPage || 0 }} /
                        {{ handlers?.totalPages || 0 }}</span
                      >
                      <button
                        class="sd-editor-button-item sd-editor-button-item--pressed"
                        @click="handlers?.handlePrevPage"
                      >
                        <svg
                          class="sv-svg-icon sv-editor-button-item__icon"
                          role="presentation"
                        >
                          <use xlink:href="#icon-chevronright-24x24"></use>
                          <title>Previous</title>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sv-popup {
  position: absolute;
  top: 50px;
}

.sv-popup__container {
  width: 100%;
}

.pagination {
  border-top: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.pagination button {
  padding: 1em;
  display: flex;
  border: none;
}

.pagination button:hover {
  background-color: var(--darkreader-bg--sjs2-palette-gray-800);
}
</style>
