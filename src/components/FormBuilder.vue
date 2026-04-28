<script setup lang="ts">
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import useStandardChanger from "../composables/useStandardChanger";
import useSurveyCreator from "../composables/useSurveyCreator";
import { type SurveyCreatorModel } from "survey-creator-core";
import { SurveyCreatorComponent } from "survey-creator-vue";
import type { Observation } from "../types/lonic";
import { Locales, Themes } from "../types/types";
import JsonGenerator from "./JsonGenerator.vue";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import Standard from "./Standard.vue";
import "../utils/serilizers";

const emit = defineEmits(["update"]);

useStandardChanger();

const props = defineProps<{
  onGenerateJsonBtnClick: (prompt: string) => SurveyCreatorModel["JSON"];
  onStandardSearch?: (text: string) => void;
  standards?: Observation[];
  locale: string | Locales;
  theme: string | Themes;
}>();

const creator = useSurveyCreator();

// apply theme and locale
creator.applyCreatorTheme(props.theme === "dark" ? DefaultDark : DefaultLight);
creator.locale = props.locale;

creator.saveSurveyFunc = () => {
  emit("update", creator.JSON);
};
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
