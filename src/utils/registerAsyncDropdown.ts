import { getCurrentInstance } from "vue";
import type { AsyncDropdownHandlers } from "../types/asyncDropdown";
import { ElementFactory, Question, Serializer } from "survey-core";
import AsyncDropdown from "../components/AsyncDropdown.vue";

export default function registerAsyncDropdown(
  type: string,
  handlers: AsyncDropdownHandlers,
) {
  class AsyncDropdownModel extends Question {
    private _handlers: AsyncDropdownHandlers | null = null;

    getType(): string {
      return type;
    }

    setHandlers(handlers: AsyncDropdownHandlers): void {
      this._handlers = handlers;
    }

    get handlers(): AsyncDropdownHandlers | null {
      return this._handlers;
    }
  }

  ElementFactory.Instance.registerElement(type, (name) => {
    const model = new AsyncDropdownModel(name);
    model.setHandlers(handlers);
    return model;
  });

  Serializer.addClass(type, [], () => new AsyncDropdownModel(""), "question");

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "registerAsyncDropdown() must be called from within a component's setup()",
    );
  }
  instance.appContext.app.component("survey-" + type, AsyncDropdown);
}
