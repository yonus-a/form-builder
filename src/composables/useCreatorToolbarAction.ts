import type { SurveyCreatorModel } from "survey-creator-core";
import type { IAction } from "survey-core";
import { onScopeDispose } from "vue";

export default function useCreatorToolbarAction(
  creator: SurveyCreatorModel,
  action: IAction & { id: string },
): void {
  creator.toolbar.removeActionById(action.id);
  creator.toolbar.addAction(action);
  onScopeDispose(() => {
    creator.toolbar.removeActionById(action.id);
  });
}
