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

    setHnalders(handlers: AsyncDropdownHandlers): void {
      this._handlers = handlers;
    }

    get handlers(): AsyncDropdownHandlers | null {
      return this._handlers;
    }
  }

  ElementFactory.Instance.registerElement(type, (name) => {
    const model = new AsyncDropdownModel(name);
    model.setHnalders(handlers);
    return model;
  });

  Serializer.addClass(type, [], () => new AsyncDropdownModel(""), "question");

  const app = getCurrentInstance()!.appContext.app;
  app.component("survey-" + type, AsyncDropdown);
}
