import type { ICreatorOptions } from "survey-creator-core";
import { SurveyCreatorModel } from "survey-creator-core";

let creator: SurveyCreatorModel;

export default function useSurveyCreator() {
  if (creator) return creator;

  const creatorOptions: ICreatorOptions = {
    showCreatorThemeSettings: false,
    showTranslationTab: true,
    autoSaveEnabled: true,
    collapseOnDrag: true,
    isRTL: false,
  };

  creator = new SurveyCreatorModel(creatorOptions);
  creator.toolbox.showSubitems = false;

  return creator;
}
