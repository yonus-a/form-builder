import type { SurveyCreatorModel } from "survey-creator-core";
import type { ComputedRef, Ref } from "vue";
import type { Question } from "survey-core";

export enum ThemeModes {
  dark = "dark",
  light = "light",
}

export enum Locales {
  fa = "fa",
  en = "en",
}
export interface ColorModeInstance {
  preference: string;
  unknown: boolean;
  forced: boolean;
  value: string;
}

export type Locale = Ref<string> | ComputedRef<string>;
export type ColorMode =
  | ColorModeInstance
  | Ref<ThemeModes>
  | ComputedRef<ThemeModes>;

export type JsonGeneratorParams = {
  stream: boolean;
  cssVariable: CssVariables;
  colorMode: ColorMode;
  locale: Locale;
};

export type Theme = {
  cssVariable?: CssVariables;
  colorMode: string;
};

export type SurveyConfig = {
  cssVariable?: CssVariables;
  colorMode: ColorMode;
  locale: Locale;
};

export type SurveyAiAssitantConfig = {
  onSubmit: (prompt: string) => SurveyCreatorModel["JSON"];
};

export type CssVariables = {
  DarkSsecondaryBackground?: string;
  DarkPrimaryBackground?: string;
  questionFontSize?: string;
  creatorRadius?: string;
  primaryColor?: string;
  errorColor?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  radius?: string;
};

export type ItemType = { value: string; text: string };

export interface AsyncDropdownHandlers {
  items: Ref<ItemType[]>;
  currentPage: Ref<number>;
  totalPages: Ref<number>;
  handleSearch: (query: string) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  onSelect?: (question: Question, item: ItemType) => void;
}

export interface AdvancedTextInput extends AsyncDropdownHandlers {
  onSelect?: (question: Question, item: ItemType) => void;
}