declare module "form-builder" {
  import { DefineComponent } from "vue";
  import { Model } from "survey-core";

  const FormBuilder: DefineComponent<{}, {}, any>;
  export default FormBuilder;
  export { Model };
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
