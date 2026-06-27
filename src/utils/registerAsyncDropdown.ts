import { getCurrentInstance } from "vue";
import type { AsyncDropdownHandlers } from "../types";
import { ElementFactory, Question, Serializer } from "survey-core";
import AsyncDropdown from "../components/AsyncDropdown.vue";

export default function registerAsyncDropdown(
  type: string,
  handlers: AsyncDropdownHandlers,
) {
  class AsyncDropdownModel extends Question {
    getType(): string {
      return type;
    }

    get handlers(): AsyncDropdownHandlers {
      return handlers;
    }
  }

  ElementFactory.Instance.registerElement(
    type,
    (name) => new AsyncDropdownModel(name),
  );

  Serializer.addClass(type, [], () => new AsyncDropdownModel(""), "question");

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "registerAsyncDropdown() must be called from within a component's setup()",
    );
  }

  instance.appContext.app.component("survey-" + type, AsyncDropdown);
}
