import type { ElementGetActionsEvent } from "survey-creator-core";
import { useSurveyCreator } from "../provider/surveyCreator";
import useCreatorEvent from "./useCreatorEvent";
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

  useCreatorEvent(creator.onElementGetActions, (_: any, options: any) => {
    element = options.element;
    options.actions.push(StandardChangerAction);
  });
}
