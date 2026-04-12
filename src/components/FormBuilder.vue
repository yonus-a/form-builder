<script setup lang="ts">
import { SurveyCreatorModel, editorLocalization } from "survey-creator-core";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import { SurveyCreatorComponent } from "survey-creator-vue";
import type { ICreatorOptions } from "survey-creator-core";
import JsonGenerator from "./JsonGenerator.vue";
import IconPicker from "./IconPicker.vue";
import "survey-creator-core/i18n/persian";
import "../utils/serilizers";

import { createApp, nextTick, onMounted, type PropType } from "vue";

const emit = defineEmits(["update"]);

const props = defineProps({
  locale: {
    default: "fa",
    type: String as PropType<"fa" | "en">,
  },
  theme: {
    default: "dark",
    type: String as PropType<"dark" | "light">,
  },
});

const creatorOptions: ICreatorOptions = {
  showCreatorThemeSettings: false,
  autoSaveEnabled: true,
  collapseOnDrag: true,
};

editorLocalization.currentLocale = props.locale;
const creator = new SurveyCreatorModel(creatorOptions);
creator.toolbox.showSubitems = false;

creator.applyCreatorTheme(props.theme === "dark" ? DefaultDark : DefaultLight);

creator.saveSurveyFunc = () => {
  emit("update", creator.JSON);
};

onMounted(() => {
  const observer = new MutationObserver(async () => {
    // Icon Picker
    const IconPickerContainer = document.querySelector(
      ".svc-logo-image input.svc-choose-file-input",
    );

    if (
      IconPickerContainer &&
      !IconPickerContainer.classList.contains("icon-picker-rendered")
    ) {
      IconPickerContainer.classList.add("icon-picker-rendered");
      createApp(IconPicker, {
        defaultValue: creator.JSON.icon,
        onSelect: (icon: string) => {
          creator.survey.icon = icon;
        },
      }).mount(".svc-logo-image");
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

const handleSetJson = async (json: string) => {
  await nextTick();
  creator.JSON = JSON.parse(json);
};
</script>

<template>
  <JsonGenerator :onUpdate="handleSetJson" />
  <SurveyCreatorComponent :model="creator" ref="creatorEl" />
</template>
