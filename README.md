# 🧱 Form Builder

> A powerful, AI-assisted, drag-and-drop form builder Vue 3 component library — built on top of [SurveyJS](https://surveyjs.io/), with full **Persian (Farsi) / English** bilingual support and **AI-powered form generation**.

[![npm version](https://img.shields.io/npm/v/@yonus_amire01/form-builder?color=2dd4bf&label=npm)](https://www.npmjs.com/package/@yonus_amire01/form-builder)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

- 🎨 **Visual drag-and-drop form designer** powered by SurveyJS Creator
- 🤖 **AI-driven form generation** — describe your form in natural language and let AI build the JSON schema
- 📋 **Standard library panel** — search and insert pre-defined clinical/standard question sets (FHIR `Observation`-compatible)
- 🌗 **Dark & Light themes** out of the box
- 🌐 **Bilingual support** — Persian (Farsi) & English, with RTL rendering
- 🖼️ **Icon Picker** — custom icon selection integrated into the toolbar
- 📦 **Dual build output** — ESM (`.mjs`) + UMD (`.umd.js`) + TypeScript declarations
- ⚡ Built with **Vite 8**, zero-config tree-shakeable exports

---

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add @yonus_amire01/form-builder

# npm
npm install @yonus_amire01/form-builder

# yarn
yarn add @yonus_amire01/form-builder
```

---

## 🔌 Async Dropdown (custom question)

Register a server-driven dropdown question that the form designer and the
rendered survey can both use. Search, pagination, and item state are owned
by your app; the component just renders them and calls your handlers.

### 1. Register the question

`registerAsyncDropdown()` uses `getCurrentInstance()` internally, so you
**must call it from inside a component's `setup()`** (or `<script setup>`)
— typically the same parent that mounts `FormBuilder`.

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  FormBuilder,
  registerAsyncDropdown,
  type ItemType,
} from "@yonus_amire01/form-builder";

const items = ref<ItemType[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
let lastQuery = "";

async function load(query: string, page: number) {
  const res = await fetch(
    `/api/items?q=${encodeURIComponent(query)}&page=${page}`,
  );
  const data = await res.json();
  items.value = data.items;          // [{ value, text }, ...]
  currentPage.value = data.page;
  totalPages.value = data.totalPages;
  lastQuery = query;
}

registerAsyncDropdown("asyncDropdown", {
  items,
  currentPage,
  totalPages,
  handleSearch: (q) => load(q, 1),
  handleNextPage: () => load(lastQuery, currentPage.value + 1),
  handlePrevPage: () => load(lastQuery, currentPage.value - 1),
});

// optional: prime the list
load("", 1);
</script>

<template>
  <FormBuilder />
</template>
```

### 2. Use it in a survey JSON

The first argument to `registerAsyncDropdown` (`"asyncDropdown"` above) is
the question `type`. Reference it in any survey JSON:

```json
{
  "elements": [
    {
      "type": "asyncDropdown",
      "name": "country",
      "title": "Country"
    }
  ]
}
```

### Handler contract

The same `AsyncDropdownHandlers` interface is used by both
`registerAsyncDropdown` and [`registerAdvancedTextInput`](#-advanced-text-input-designer-only-async-dropdown).

| Field            | Type                                            | Notes                                                                                  |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `items`          | `Ref<ItemType[]>`                               | Current page of options — `{ value, text }`                                            |
| `currentPage`    | `Ref<number>`                                   | 1-based current page                                                                   |
| `totalPages`     | `Ref<number>`                                   | Total page count; set `0` to hide the pager                                            |
| `handleSearch`   | `(query: string) => void`                       | Called on every keystroke — debounce if needed                                         |
| `handleNextPage` | `() => void`                                    | Called when the next button is pressed                                                 |
| `handlePrevPage` | `() => void`                                    | Called when the previous button is pressed                                             |
| `onSelect?`      | `(question: Question, item: ItemType) => void`  | **Only invoked by `registerAdvancedTextInput`** — ignored by the runtime dropdown      |

> ⚠️ `items`, `currentPage`, and `totalPages` **must be Vue `Ref`s** —
> the component reads `.value` and re-renders reactively when you mutate them.

---

## 📝 Advanced Text Input (designer-only async dropdown)

`registerAdvancedTextInput` registers a question that **renders as a
regular text input at runtime**, but whose **`convertInputType` button
in the form designer** opens your async dropdown instead of the default
subtype list. When the designer picks an item, your `onSelect` callback
runs and can mutate the question — e.g. set `name` and `title` from the
chosen item.

Use this when you want the form designer to choose from a server-backed
catalogue (FHIR codes, country lists, glossary terms…) but want
end-users to type freely into a normal text field.

### 1. Register the type

Same `AsyncDropdownHandlers` shape as `registerAsyncDropdown`, plus the
optional `onSelect`. Must be called from a component's `setup()`.

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import {
  FormBuilder,
  registerAdvancedTextInput,
  type AsyncDropdownHandlers,
  type ItemType,
} from "@yonus_amire01/form-builder";

const COUNTRIES: ItemType[] = [
  { value: "IR", text: "Iran" },
  { value: "US", text: "United States" },
  { value: "GB", text: "United Kingdom" },
  // …
];

const PAGE_SIZE = 5;
const query = ref("");
const currentPage = ref(1);

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim();
  return q
    ? COUNTRIES.filter((c) => c.text.toLowerCase().includes(q))
    : COUNTRIES;
});
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)),
);
const items = computed(() =>
  filtered.value.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE,
  ),
);

const handlers: AsyncDropdownHandlers = {
  items,
  currentPage,
  totalPages,
  handleSearch: (q) => {
    query.value = q;
    currentPage.value = 1;
  },
  handleNextPage: () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  },
  handlePrevPage: () => {
    if (currentPage.value > 1) currentPage.value--;
  },
  // designer-only — runs when an item is picked from the convertInputType popup
  onSelect: (question, item) => {
    question.name = item.value;
    question.title = item.text;
  },
};

registerAdvancedTextInput("countryAsync", handlers);
</script>

<template>
  <FormBuilder />
</template>
```

### 2. Use the type in survey JSON

```json
{
  "elements": [
    { "type": "countryAsync", "name": "country" }
  ]
}
```

In the designer, click the question's **convertInputType** button (the
chevron next to the type label) — your async list pops up. Pick an
item, and:

- the question's properties update via your `onSelect`,
- the popup closes,
- the selection is highlighted on next open, and
- the action button's title becomes the selected item's `text`.

At runtime the question is a plain text input — the popup never appears.

### How it differs from `registerAsyncDropdown`

| Aspect                   | `registerAsyncDropdown`                    | `registerAdvancedTextInput`                              |
| ------------------------ | ------------------------------------------ | -------------------------------------------------------- |
| Runtime render           | Custom dropdown Vue component              | Native text input (`survey-text`)                        |
| Where the user picks     | At survey-fill time                        | In the designer's `convertInputType` popup               |
| What selection does      | Sets `question.value = item.value`         | Calls `handlers.onSelect(question, item)` — you decide   |
| `onSelect` handler       | Ignored                                    | Required for anything to happen                          |

### Internals (for the curious)

- The popup component (`advanced-text-input-popup`) is registered
  globally on the active Vue app on first call.
- `QuestionAdornerViewModel.prototype.createConvertInputType` is
  monkey-patched **once** to swap in the async popup for questions
  registered through this helper. Other question types keep their
  default behaviour.
- The registered class extends `QuestionTextModel` and overrides
  `getType()` (so the JSON round-trips with your custom type),
  `getTemplate()` / `getCssType()` → `"text"` (so SurveyJS renders +
  styles it as a regular text input).
