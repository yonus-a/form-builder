export enum Themes {
  dark = "dark",
  light = "light",
}
export enum Locales {
  fa = "fa",
  en = "en",
}

export type JsonGeneratorParams = {
  prompt: string;
  model: string;
  stream: boolean;
};
