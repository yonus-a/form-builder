export enum Themes {
  dark = "dark",
  light = "light",
}
export enum Locales {
  fa = "fa",
  en = "en",
}

export type JsonGeneratorParams = {
  stream: boolean;
  prompt: string;
  model: string;
};

export type CssVariables = {
  DarkSsecondaryBackground: string;
  DarkPrimaryBackground: string;
  questionFontSize: string;
  creatorRadius: string;
  primaryColor: string;
  errorColor: string;
  fontFamily: string;
  fontSize: string;
  radius: string;
};

export type advancedQuestion = {
  name: string;
  data: {
    title: string;
    vaule: string;
  };
  page: number;
  limit: number;
  handleSearch: string;
};
