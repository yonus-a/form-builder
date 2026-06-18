<script setup lang="ts">
import { initSurveyCreator } from "../provider/surveyCreator.ts";
import { SurveyCreatorComponent } from "survey-creator-vue";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import "../utils/serilizers";

const emit = defineEmits(["update"]);
const creator = initSurveyCreator();
</script>

<template>
  <IconPicker />
  <!-- <JsonGenerator @generateBtnClick="props.onGenerateJsonBtnClick" />
  <Standard
    v-if="standards && onStandardSearch"
    :onStandardSearch
    :locale="locale"
    :standards
  />-->
  <SurveyCreatorComponent :model="creator" />
</template>
