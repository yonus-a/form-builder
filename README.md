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

| Field            | Type                       | Notes                                              |
| ---------------- | -------------------------- | -------------------------------------------------- |
| `items`          | `Ref<ItemType[]>`          | Current page of options — `{ value, text }`        |
| `currentPage`    | `Ref<number>`              | 1-based current page                               |
| `totalPages`     | `Ref<number>`              | Total page count; set `0` to hide the pager        |
| `handleSearch`   | `(query: string) => void`  | Called on every keystroke — debounce if needed     |
| `handleNextPage` | `() => void`               | Called when the next button is pressed             |
| `handlePrevPage` | `() => void`               | Called when the previous button is pressed         |

> ⚠️ `items`, `currentPage`, and `totalPages` **must be Vue `Ref`s** —
> the component reads `.value` and re-renders reactively when you mutate them.
