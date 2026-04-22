<script setup lang="ts">
import useStandardChanger from "../composables/useStandardChanger";
import useSurveyCreator from "../composables/useSurveyCreator";
import { SurveyCreatorComponent } from "survey-creator-vue";
import { Locales, Themes } from "../types/types";
import JsonGenerator from "./JsonGenerator.vue";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import Standard from "./Standard.vue";
import "../utils/serilizers";

const emit = defineEmits(["update"]);

useStandardChanger();

const props = defineProps<{
  locale: Locales;
  theme: Themes;
}>();

const creator = useSurveyCreator(props);

creator.saveSurveyFunc = () => {
  emit("update", creator.JSON);
};
</script>

<template>
  <IconPicker />
  <JsonGenerator />
  <Standard :locale="locale" />
  <SurveyCreatorComponent :model="creator" ref="creatorEl" />
</template>
