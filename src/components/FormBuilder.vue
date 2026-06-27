<script setup lang="ts">
import { initSurveyCreator } from "../provider/surveyCreator.ts";
import { SurveyCreatorComponent } from "survey-creator-vue";
import AiAssistant from "./AiAssistant.vue";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import "../utils/serilizers";
import { watch } from "vue";

const json = defineModel<object>("json");
const creator = initSurveyCreator();

creator.saveSurveyFunc = () => {
  json.value = creator.JSON;
};

watch(
  json,
  (val) => {
    if (val) creator.JSON = val;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<template>
  <IconPicker />
  <AiAssistant />
  <SurveyCreatorComponent :model="creator" />
</template>
