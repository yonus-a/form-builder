import {
  DefaultDarkPanelless,
  DefaultLightPanelless,
} from "survey-core/themes";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import type { CssVariables } from "../types/types";

export const getThemes = (variables: CssVariables) => {
  if (!Object.keys(variables).length) {
    return {
      SurveyLightTheme: DefaultLightPanelless,
      SurveyDarkTheme: DefaultDarkPanelless,
      SurveyCratorLightTheme: DefaultLight,
      SurveyCratorDarkTheme: DefaultDark,
    };
  }

  const base = {
    "--sjs-primary-backcolor-dark": variables.primaryColor + "a1",
    "--sjs-font-questiontitle-size": variables.questionFontSize,
    "--sjs-font-questiontitle-family": variables.fontFamily,
    "--sjs-special-red-light": variables.errorColor + "a1",
    "--sjs-primary-backcolor": variables.primaryColor,
    "--sjs-font-editorfont-size": variables.fontSize,
    "--sjs-special-red": variables.errorColor,
    "--sjs-font-questiontitle-weight": "400",
    "--sjs-border-light": "rgba(0, 0, 0, 0.09)",
    "--sjs-border-default": "rgba(0, 0, 0, 0.16)",
    "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
    "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.15)",
    "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
    "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
    "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
    "--sjs-font-pagedescription-weight": "400",
    "--sjs-font-family": variables.fontFamily,
    "--sjs-corner-radius": variables.radius,
  };

  const SurveyDarkTheme = {
    ...DefaultDarkPanelless,
    cssVariables: {
      ...DefaultDarkPanelless.cssVariables,
      "--sjs-general-backcolor-dim-light": variables.DarkSsecondaryBackground,
      "--sjs-questionpanel-backcolor": variables.DarkSsecondaryBackground,
      "--sjs-editorpanel-backcolor": variables.DarkSsecondaryBackground,
      "--sjs-general-backcolor-dim": variables.DarkPrimaryBackground,
      "--sjs-general-backcolor": variables.DarkSsecondaryBackground,
      ...base,
    },
  };

  const SurveyLightTheme = {
    ...DefaultLightPanelless,
    cssVariables: {
      ...DefaultLightPanelless.cssVariables,
      ...base,
    },
  };

  const SurveyCratorDarkTheme = {
    ...DefaultDark,
    cssVariables: {
      ...DefaultDark.cssVariables,
      "--sjs2-color-utility-surface-designer":
        variables.DarkSsecondaryBackground,
      "--lbr-question-panel-background-color": variables.DarkPrimaryBackground,
      "--sjs2-palette-gray-800": variables.DarkSsecondaryBackground,
      "--sjs2-palette-gray-900": variables.DarkPrimaryBackground,
      "--ctr-font-family": variables.fontFamily,
    },
  };

  const SurveyCratorLightTheme = {
    ...DefaultLight,
    cssVariables: {
      ...DefaultLight.cssVariables,
    },
  };

  return {
    SurveyCratorLightTheme,
    SurveyCratorDarkTheme,
    SurveyLightTheme,
    SurveyDarkTheme,
  };
};
