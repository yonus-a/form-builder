import { provideSurveyConfig } from "./provider/surveyConfig.ts";
import { createApp, defineComponent, h, ref } from "vue";
import FormBuilder from "./components/FormBuilder.vue";
import "survey-creator-core/survey-creator-core.css";
import "survey-core/survey-core.css";
import "./styles/style.css";

export const SurveyCssVariable = {
  DarkSsecondaryBackground: "#020618",
  DarkPrimaryBackground: "#0F172B",
  fontFamily: "var(--font-sans)",
  primaryColor: "#00d5be",
  questionFontSize: "15px",
  errorColor: "#ff2156",
  creatorRadius: "16px",
  fontWeight: "400",
  fontSize: "14px",
  radius: "8px",
};

const Root = defineComponent({
  setup() {
    provideSurveyConfig({
      cssVariable: SurveyCssVariable,
      colorMode: ref("dark") as any,
      locale: ref("fa"),
    });
    return () => h(FormBuilder);
  },
});

createApp(Root).mount("#app");

document.querySelector("#app")?.setAttribute("style", "height: 100vh");
