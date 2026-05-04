import type { SurveyModel } from "survey-core";

export default function useScrollToError(survey: SurveyModel) {
  survey.onValidateQuestion.add((_, options) => {
    const error: any = options.errors[0];

    if (error) {
      const question = error.errorOwner;
      question.getWrapperElement().scrollIntoView();
    }
  });
}
