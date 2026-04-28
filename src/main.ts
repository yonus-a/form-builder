import FormBuilder from "./components/FormBuilder.vue";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { surveyLocalization } from "survey-core";
import { Locales } from "./types/types";
import { createApp } from "vue";
import "./styles/style.css";

surveyLocalization.supportedLocales = [Locales.fa, Locales.en];
surveyLocalization.setupLocale({
  localeCode: Locales.fa,
  nativeName: "فارسی",
  englishName: "Farsi",
  strings: "فارسی",
});

createApp(FormBuilder, {
  locale: "fa",
  theme: "dark",
  standards: [],
  onStandardSearch: () => {},
  onGenerateJsonBtnClick: () => {},
}).mount("#app");

document.querySelector("#app")?.setAttribute("style", "height: 100vh");
