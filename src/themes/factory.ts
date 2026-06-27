import {
  DefaultDarkPanelless,
  DefaultLightPanelless,
} from "survey-core/themes";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import type { CssVariables, Theme } from "../types";

const getBaseVariables = (variables: CssVariables) => ({
  ...(variables.primaryColor && {
    "--sjs-primary-backcolor": variables.primaryColor,
    "--sjs-primary-backcolor-dark": variables.primaryColor + "a1",
  }),
  ...(variables.errorColor && {
    "--sjs-special-red": variables.errorColor,
    "--sjs-special-red-light": variables.errorColor + "a1",
  }),
  ...(variables.fontFamily && {
    "--sjs-font-questiontitle-family": variables.fontFamily,
    "--sjs-font-family": variables.fontFamily,
  }),
  ...(variables.fontWeight && {
    "--sjs-font-pagedescription-weight": variables.fontWeight,
    "--sjs-font-questiontitle-weight": variables.fontWeight,
  }),
  ...(variables.questionFontSize && {
    "--sjs-font-questiontitle-size": variables.questionFontSize,
  }),
  ...(variables.fontSize && {
    "--sjs-font-editorfont-size": variables.fontSize,
  }),
  ...(variables.radius && { "--sjs-corner-radius": variables.radius }),
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
    ...(variables.DarkSsecondaryBackground && {
      "--sjs-general-backcolor-dim-light": variables.DarkSsecondaryBackground,
      "--sjs-questionpanel-backcolor": variables.DarkSsecondaryBackground,
      "--sjs-editorpanel-backcolor": variables.DarkSsecondaryBackground,
      "--sjs-general-backcolor": variables.DarkSsecondaryBackground,
    }),
    ...(variables.DarkPrimaryBackground && {
      "--sjs-general-backcolor-dim": variables.DarkPrimaryBackground,
    }),
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
    ...(variables.DarkSsecondaryBackground && {
      "--sjs2-color-utility-surface-designer":
        variables.DarkSsecondaryBackground,
      "--sjs2-palette-gray-800": variables.DarkSsecondaryBackground,
    }),
    ...(variables.DarkPrimaryBackground && {
      "--lbr-question-panel-background-color": variables.DarkPrimaryBackground,
      "--sjs2-palette-gray-900": variables.DarkPrimaryBackground,
    }),
    ...(variables.fontFamily && { "--ctr-font-family": variables.fontFamily }),
  },
});

export const getServeyTheme = (theme: Theme) => {
  if (!theme) return DefaultDarkPanelless;
  const variables = theme.cssVariable ?? {};
  return theme.colorMode === "dark"
    ? getSurveyDarkTheme(variables)
    : getSurveyLightTheme(variables);
};

export const getServeyCreatorTheme = (theme: Theme) => {
  if (!theme) return DefaultDark;
  const variables = theme.cssVariable ?? {};
  return theme.colorMode === "dark"
    ? getSurveyCratorDarkTheme(variables)
    : getSurveyCratorLightTheme(variables);
};
