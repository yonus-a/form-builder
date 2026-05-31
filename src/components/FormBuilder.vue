<script setup lang="ts">
import { Locales, Themes, type CssVariables } from "../types/types";
import useStandardChanger from "../composables/useStandardChanger";
import useSurveyCreator from "../composables/useSurveyCreator";
import { type SurveyCreatorModel } from "survey-creator-core";
import { SurveyCreatorComponent } from "survey-creator-vue";
import type { Observation } from "../types/lonic";
import JsonGenerator from "./JsonGenerator.vue";
import { getThemes } from "../themes/theme";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import Standard from "./Standard.vue";
import "../utils/serilizers";
import { watch } from "vue";

const emit = defineEmits(["update"]);

useStandardChanger();

const props = defineProps<{
  onGenerateJsonBtnClick: (prompt: string) => SurveyCreatorModel["JSON"];
  onStandardSearch?: (text: string) => void;
  cssVariables: CssVariables;
  standards?: Observation[];
  locale: string | Locales;
  theme: string | Themes;
  json?: string;
}>();

const creator = useSurveyCreator();

const { SurveyCratorDarkTheme, SurveyCratorLightTheme } = getThemes(
  props.cssVariables,
);

// apply theme and locale
creator.applyCreatorTheme(
  props.theme === "dark" ? SurveyCratorDarkTheme : SurveyCratorLightTheme,
);

creator.locale = props.locale;

creator.saveSurveyFunc = () => {
  emit("update", creator.JSON);
};

watch(
  () => props.json,
  () => (creator.JSON = props.json),
);
</script>

<template>
  <IconPicker />
  <JsonGenerator @generateBtnClick="props.onGenerateJsonBtnClick" />
  <Standard
    v-if="standards && onStandardSearch"
    :onStandardSearch
    :locale="locale"
    :standards
  />
  <SurveyCreatorComponent :model="creator" />
</template>
