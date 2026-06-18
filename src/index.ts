import useScrollToError from "./composables/useScrollToError";
import { SurveySchemaPrompt } from "./utils/prefixPrompts";
import FormBuilder from "./components/FormBuilder.vue";

import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import "./styles/style.css";

export type { CssVariables } from "./types/types";
export { SurveyComponent } from "survey-vue3-ui";
export * from "./provider/surveyConfig.ts";
export * from "./themes/factory.ts";
export type * from "./types/lonic";
export * from "survey-core";

export { FormBuilder, SurveySchemaPrompt, useScrollToError };
