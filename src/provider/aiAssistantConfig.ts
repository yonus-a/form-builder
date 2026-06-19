import { inject, provide, type InjectionKey } from "vue";
import type { SurveyAiAssitantConfig } from "../types/types";

const SURVEY_AI_ASSISTANT: InjectionKey<SurveyAiAssitantConfig> = Symbol(
  "survey_ai_assistant_config",
);

export function provideAiAssistantConfig(config: SurveyAiAssitantConfig) {
  provide(SURVEY_AI_ASSISTANT, config);
}

export function useSurveyAiAssistantConfig() {
  const config = inject(SURVEY_AI_ASSISTANT);
  if (!config) {
    throw new Error(
      "useSurveyAiAssistantConfig() called without provideAiAssistantConfig() in an ancestor",
    );
  }
  return config;
}
