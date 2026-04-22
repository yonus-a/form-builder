import type { ElementGetActionsEvent } from "survey-creator-core";
import useSurveyCreator from "./useSurveyCreator";
import { Action } from "survey-core";

export default function useStandardChanger() {
  const creator = useSurveyCreator();
  let element: ElementGetActionsEvent["element"];

  const StandardChangerAction = new Action({
    iconName: "icon-save-24x24",
    id: "standardChanger",
    visibleIndex: 9,
    title: "Save",
    action: () => {
      console.log(element.toJSON());
    },
  });

  creator.onElementGetActions.add((_, options) => {
    element = options.element;
    options.actions.push(StandardChangerAction);
  });
}
