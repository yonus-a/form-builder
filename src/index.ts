import registerAdvancedTextInput from "./utils/registerAdvancedTextInput";
import registerAsyncDropdown from "./utils/registerAsyncDropdown";
import useScrollToError from "./composables/useScrollToError";
import { SurveySchemaPrompt } from "./utils/prefixPrompts";
import FormBuilder from "./components/FormBuilder.vue";

import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import "./styles/style.css";

export { useSurveyCreator } from "./provider/surveyCreator";
export type { CssVariables } from "./types/index.ts";
export { SurveyComponent } from "survey-vue3-ui";
export * from "./composables/useSurveyModel.ts";
export * from "./provider/aiAssistantConfig.ts";
export * from "./provider/surveyConfig.ts";
export * from "./themes/factory.ts";
export * from "survey-core";

export {
  FormBuilder,
  SurveySchemaPrompt,
  registerAsyncDropdown,
  registerAdvancedTextInput,
  useScrollToError,
};
