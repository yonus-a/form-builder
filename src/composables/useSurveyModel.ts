import { useSurveyConfig } from "../provider/surveyConfig";
import immediateWatch from "../utils/immediateWatch";
import { getServeyTheme } from "../themes/factory";
import useScrollToError from "./useScrollToError";
import { Model, SurveyModel } from "survey-core";

export function useSurveyModel(): SurveyModel {
  const config = useSurveyConfig();
  const survey = new Model();

  useScrollToError(survey);
  immediateWatch([config.locale], () => (survey.locale = config.locale.value));
  immediateWatch([config.colorMode], () => {
    survey.applyTheme(
      getServeyTheme({
        colorMode: config.colorMode.value,
        cssVariable: config.cssVariable,
      }),
    );
  });

  return survey;
}
