import { inject, provide, type InjectionKey } from "vue";
import type { SurveyConfig } from "../types";

const SURVEY_CONFIG: InjectionKey<SurveyConfig> = Symbol("survey_config");

export function provideSurveyConfig(config: SurveyConfig) {
  provide(SURVEY_CONFIG, config);
}

export function useSurveyConfig() {
  const creator = inject(SURVEY_CONFIG);
  if (!creator) {
    throw new Error(
      "useSurveyConfig() called without provideSurveyConfig() in an ancestor",
    );
  }
  return creator;
}
