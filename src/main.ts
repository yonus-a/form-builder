import FormBuilder from "./components/FormBuilder.vue";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { createApp } from "vue";
import "./styles/style.css";

createApp(FormBuilder).mount("#app");

document.querySelector("#app")?.setAttribute("style", "height: 100vh");
