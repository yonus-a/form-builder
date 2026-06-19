import type { ComputedRef, Ref } from "vue";

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
  prompt: string;
  model: string;
};

export type Theme = {
  cssVariable: CssVariables;
  colorMode: string;
};

export type SurveyConfig = {
  cssVariable: CssVariables;
  colorMode: ColorMode;
  locale: Locale;
};

export type CssVariables = {
  DarkSsecondaryBackground: string;
  DarkPrimaryBackground: string;
  questionFontSize: string;
  creatorRadius: string;
  primaryColor: string;
  errorColor: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  radius: string;
};

export type advancedQuestion = {
  name: string;
  data: {
    title: string;
    vaule: string;
  };
  page: number;
  limit: number;
  handleSearch: string;
};
