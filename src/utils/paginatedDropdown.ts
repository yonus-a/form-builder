import { Question, Serializer, ElementFactory } from "survey-core";
import { defineComponent, h } from "vue";
import PaginatedDropdownVue from "../components/PaginatedDropdown.vue";
import { ComponentFactory } from "survey-vue3-ui";
import type { Choice } from "../types/lonic";

const PAGINATED_DROPDOWN_TYPE = "paginateddropdown";

export class QuestionPaginatedDropdownModel extends Question {
  getType(): string {
    return PAGINATED_DROPDOWN_TYPE;
  }

  get choices(): Choice[] {
    return this.getPropertyValue("choices", []);
  }
  set choices(val: Choice[]) {
    this.setPropertyValue("choices", val);
  }

  get pageSize(): number {
    return this.getPropertyValue("pageSize", 10);
  }
  set pageSize(val: number) {
    this.setPropertyValue("pageSize", val);
  }

  get searchable(): boolean {
    return this.getPropertyValue("searchable", false);
  }
  set searchable(val: boolean) {
    this.setPropertyValue("searchable", val);
  }

  get placeholder(): string {
    return this.getPropertyValue("placeholder", "");
  }
  set placeholder(val: string) {
    this.setPropertyValue("placeholder", val);
  }
}

// Register element factory
ElementFactory.Instance.registerElement(
  PAGINATED_DROPDOWN_TYPE,
  (name: string) => new QuestionPaginatedDropdownModel(name)
);

// Register serializer class and properties
Serializer.addClass(
  PAGINATED_DROPDOWN_TYPE,
  [
    {
      name: "choices",
      category: "choices",
      visibleIndex: 1,
    },
    {
      name: "pageSize",
      category: "general",
      default: 10,
    },
    {
      name: "searchable",
      category: "general",
      default: false,
    },
    {
      name: "placeholder",
      category: "general",
      default: "",
    },
  ],
  () => new QuestionPaginatedDropdownModel(""),
  "question"
);

// Vue component that survey-vue3-ui renders for this question type.
// Receives { question } from the framework (see Element.vue rendering logic).
const SurveyPaginatedDropdown = defineComponent({
  name: "SurveyPaginatedDropdown",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const q = props.question as QuestionPaginatedDropdownModel;
      return h(PaginatedDropdownVue, {
        choices: q.choices ?? [],
        pageSize: q.pageSize ?? 10,
        searchable: q.searchable ?? false,
        placeholder: q.placeholder ?? "",
        modelValue: q.value ?? "",
        "onUpdate:modelValue": (val: string) => {
          q.value = val;
        },
      });
    };
  },
});

// Register Vue component with survey-vue3-ui's ComponentFactory.
// The component name "survey-paginateddropdown" is used because survey-vue3-ui
// resolves custom question components as "survey-" + question.getTemplate().
ComponentFactory.Instance.registerComponent(
  `survey-${PAGINATED_DROPDOWN_TYPE}`,
  SurveyPaginatedDropdown
);
