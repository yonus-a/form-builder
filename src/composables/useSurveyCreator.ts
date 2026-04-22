import { SurveyCreatorModel, editorLocalization } from "survey-creator-core";
import { DefaultDark, DefaultLight } from "survey-creator-core/themes";
import type { ICreatorOptions } from "survey-creator-core";
import { surveyLocalization } from "survey-core";
import { Locales, Themes } from "../types/types";

type Params = {
  locale: Locales;
  theme: Themes;
};

let creator: SurveyCreatorModel;

export default function useSurveyCreator(
  { locale, theme }: Params = { locale: Locales.fa, theme: Themes.dark },
) {
  if (creator) return creator;

  const creatorOptions: ICreatorOptions = {
    showCreatorThemeSettings: false,
    showTranslationTab: true,
    autoSaveEnabled: true,
    collapseOnDrag: true,
    isRTL: true,
  };

  editorLocalization.currentLocale = locale;

  surveyLocalization.supportedLocales = [Locales.fa, Locales.en];
  surveyLocalization.setupLocale({
    localeCode: Locales.fa,
    nativeName: "فارسی",
    englishName: "Farsi",
    strings: "فارسی",
  });

  creator = new SurveyCreatorModel(creatorOptions);
  creator.toolbox.showSubitems = false;

  creator.applyCreatorTheme(theme === Themes.dark ? DefaultDark : DefaultLight);

  return creator;
}
