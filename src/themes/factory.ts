import {
  DefaultDarkPanelless,
  DefaultLightPanelless,
} from "survey-core/themes";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import type { CssVariables, Theme } from "../types/types";

const getBaseVariables = (variables: CssVariables) => ({
  "--sjs-primary-backcolor-dark": variables.primaryColor + "a1",
  "--sjs-font-questiontitle-size": variables.questionFontSize,
  "--sjs-font-pagedescription-weight": variables.fontWeight,
  "--sjs-font-questiontitle-family": variables.fontFamily,
  "--sjs-font-questiontitle-weight": variables.fontWeight,
  "--sjs-special-red-light": variables.errorColor + "a1",
  "--sjs-primary-backcolor": variables.primaryColor,
  "--sjs-font-editorfont-size": variables.fontSize,
  "--sjs-special-red": variables.errorColor,
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

const getSurveyCratorLightTheme = (variables: CssVariables) => ({
  ...DefaultLight,
  cssVariables: {
    ...DefaultLight.cssVariables,
    ...getBaseVariables(variables),
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
    : getSurveyCratorLightTheme(theme.cssVariable);
};
