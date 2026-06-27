import { getCurrentInstance, ref, type Ref } from "vue";
import {
  Action,
  ElementFactory,
  PopupModel,
  Question,
  QuestionTextModel,
  Serializer,
} from "survey-core";
import { QuestionAdornerViewModel } from "survey-creator-core";
import AdvancedTextInputPopup from "../components/AdvancedTextInputPopup.vue";
import type { AsyncDropdownHandlers, ItemType } from "../types";

const POPUP_COMPONENT_NAME = "survey-text-input-popup";

const advancedHandlers = new WeakMap<Question, AsyncDropdownHandlers>();
let adornerPatched = false;

function buildConvertInputTypeAction(
  surveyElement: Question,
  handlers: AsyncDropdownHandlers,
) {
  const selected: Ref<ItemType | null> = ref(null);

  const popupModel = new PopupModel(
    POPUP_COMPONENT_NAME,
    {
      model: {
        question: surveyElement,
        handlers,
        selected,
        popupModel: null as any,
        onItemSelected: (item: ItemType) => {
          selected.value = item;
          action.title = item.text;
        },
      },
    },
    { verticalPosition: "bottom", horizontalPosition: "center" },
  );
  popupModel.contentComponentData.model.popupModel = popupModel;
  popupModel.displayMode = "popup";
  popupModel.cssClass = "svc-creator-popup";

  const action = new Action({
    id: "convertInputType",
    visibleIndex: 1,
    title: "Select",
    disableShrink: true,
    iconName: "icon-chevron_16x16",
    component: "sv-action-bar-item-dropdown",
    popupModel,
    action: (_: Action, isUserAction?: boolean) => {
      popupModel.isFocusedContent = !isUserAction;
      popupModel.show();
    },
  });

  return action;
}

function patchConvertInputType() {
  if (adornerPatched) return;
  adornerPatched = true;

  const proto = QuestionAdornerViewModel.prototype as unknown as Record<
    string,
    (...args: unknown[]) => unknown
  >;
  const original = proto.createConvertInputType;
  proto.createConvertInputType = function (this: QuestionAdornerViewModel) {
    const element = this.surveyElement as Question | undefined;
    const handlers = element && advancedHandlers.get(element);
    if (!element || !handlers) {
      return original.call(this);
    }
    return buildConvertInputTypeAction(element, handlers);
  };
}

export default function registerAdvancedTextInput(
  type: string,
  handlers: AsyncDropdownHandlers,
) {
  class AdvancedTextInputModel extends QuestionTextModel {
    constructor(name: string) {
      super(name);
      advancedHandlers.set(this, handlers);
    }

    getType(): string {
      return type;
    }

    getTemplate(): string {
      return "text";
    }

    getCssType(): string {
      return "text";
    }

    get handlers(): AsyncDropdownHandlers {
      return handlers;
    }
  }

  ElementFactory.Instance.registerElement(
    type,
    (name) => new AdvancedTextInputModel(name),
  );

  Serializer.addClass(type, [], () => new AdvancedTextInputModel(""), "text");

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "registerAdvancedTextInput() must be called from within a component's setup()",
    );
  }

  if (!instance.appContext.components[POPUP_COMPONENT_NAME]) {
    instance.appContext.app.component(
      POPUP_COMPONENT_NAME,
      AdvancedTextInputPopup,
    );
  }

  patchConvertInputType();
}
