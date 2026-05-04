import useScrollToError from "./composables/useScrollToError";
import { SurveySchemaPrompt } from "./utils/prefixPrompts";
import FormBuilder from "./components/FormBuilder.vue";
import { surveyLocalization } from "survey-core";
import { Locales } from "./types/types";

import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import "./styles/style.css";

surveyLocalization.supportedLocales = [Locales.fa, Locales.en];
surveyLocalization.setupLocale({
  localeCode: Locales.fa,
  nativeName: "فارسی",
  englishName: "Farsi",
  strings: "فارسی",
  rtl: true,
});

export type { CssVariables } from "./types/types";
export { SurveyComponent } from "survey-vue3-ui";
export { getThemes } from "./themes/theme";
export type * from "./types/lonic";
export * from "survey-core";

export { FormBuilder, SurveySchemaPrompt, useScrollToError };
