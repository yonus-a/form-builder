import { inject, provide, type InjectionKey } from "vue";
import type { SurveyStandardConfig } from "../types/types";

const SURVEY_STANDARD: InjectionKey<SurveyStandardConfig> =
  Symbol("survey_standard");

export function provideSurveyStandardConfig(config: SurveyStandardConfig) {
  provide(SURVEY_STANDARD, config);
}

export function useSurveyStandardConfig() {
  const config = inject(SURVEY_STANDARD);
  if (!config) {
    throw new Error(
      "useSurveyStandardConfig() called without provideSurveyStandardConfig() in an ancestor",
    );
  }
  return config;
}
