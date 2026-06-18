import {
  DefaultDarkPanelless,
  DefaultLightPanelless,
} from "survey-core/themes";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import type { CssVariables, Theme } from "../types/types";

const getBaseVariables = (variables: CssVariables) => ({
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
});

const getSurveyLightTheme = (variables: CssVariables) => ({
  ...DefaultLightPanelless,
  cssVariables: {
    ...DefaultLightPanelless.cssVariables,
    ...getBaseVariables(variables),
  },
});

const getSurveyDarkTheme = (variables: CssVariables) => ({
  ...DefaultDarkPanelless,
  cssVariables: {
    ...DefaultDarkPanelless.cssVariables,
    "--sjs-general-backcolor-dim-light": variables.DarkSsecondaryBackground,
    "--sjs-questionpanel-backcolor": variables.DarkSsecondaryBackground,
    "--sjs-editorpanel-backcolor": variables.DarkSsecondaryBackground,
    "--sjs-general-backcolor-dim": variables.DarkPrimaryBackground,
    "--sjs-general-backcolor": variables.DarkSsecondaryBackground,
    ...getBaseVariables(variables),
  },
});

const getSurveyCratorLightTheme = () => ({
  ...DefaultLight,
  cssVariables: {
    ...DefaultLight.cssVariables,
  },
});

const getSurveyCratorDarkTheme = (variables: CssVariables) => ({
  ...DefaultDark,
  cssVariables: {
    ...DefaultDark.cssVariables,
    "--sjs2-color-utility-surface-designer": variables.DarkSsecondaryBackground,
    "--lbr-question-panel-background-color": variables.DarkPrimaryBackground,
    "--sjs2-palette-gray-800": variables.DarkSsecondaryBackground,
    "--sjs2-palette-gray-900": variables.DarkPrimaryBackground,
    "--ctr-font-family": variables.fontFamily,
  },
});

export const getServeyTheme = (theme: Theme) => {
  if (!theme) return DefaultDarkPanelless;
  return theme.colorMode === "dark"
    ? getSurveyDarkTheme(theme.cssVariable)
    : getSurveyLightTheme(theme.cssVariable);
};

export const getServeyCreatorTheme = (theme: Theme) => {
  if (!theme) return DefaultDark;
  return theme.colorMode === "dark"
    ? getSurveyCratorDarkTheme(theme.cssVariable)
    : getSurveyCratorLightTheme();
};
