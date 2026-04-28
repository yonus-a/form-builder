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
});

export {
  DefaultDarkPanelless,
  DefaultLightPanelless,
} from "survey-core/themes";
export { SurveyComponent } from "survey-vue3-ui";
export * from "survey-core";

export { FormBuilder, SurveySchemaPrompt };
