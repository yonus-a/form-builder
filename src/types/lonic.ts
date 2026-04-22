export interface LocalizedText {
  en: string;
  fa?: string;
}

export enum FHIRKEYS {
  EN_NAME = "English Variable Name",
  FA_NAME = "Persian Variable Name",
  CODE = "LOINC Code",
  MIN = "Normal Min",
  MAX = "Normal Max",
  UNIT = "UCUM Unit",
}

export enum LOINCSCALETYPES {
  SemiQn = "SemiQn",
  OrdQn = "OrdQn",
  Multi = "Multi",
  Nar = "Nar",
  Doc = "Doc",
  Ord = "Ord",
  Nom = "Nom",
  Set = "Set",
  Qn = "Qn",
}

export enum SCALETYPES {
  ordinal_quantitative = "ordinal_quantitative",
  semi_quantitative = "semi_quantitative",
  narrative = "narrative",
  document = "document",
  quantity = "quantity",
  ordinal = "ordinal",
  nominal = "nominal",
  multi = "multi",
  set = "set",
}

export const ScaleTypeMap: Record<LOINCSCALETYPES, SCALETYPES> = {
  OrdQn: SCALETYPES.ordinal_quantitative,
  SemiQn: SCALETYPES.semi_quantitative,
  Nar: SCALETYPES.narrative,
  Doc: SCALETYPES.document,
  Qn: SCALETYPES.quantity,
  Multi: SCALETYPES.multi,
  Ord: SCALETYPES.ordinal,
  Nom: SCALETYPES.nominal,
  Set: SCALETYPES.set,
};

export enum ELEMENTS {
  radiogroup = "radiogroup",
  checkbox = "checkbox",
  rating = "rating",
  number = "number",
  text = "text",
}

export const ScaleTypeMapToElement: Partial<Record<LOINCSCALETYPES, ELEMENTS>> =
  {
    SemiQn: ELEMENTS.radiogroup,
    Multi: ELEMENTS.checkbox,
    Ord: ELEMENTS.radiogroup,
    Nom: ELEMENTS.radiogroup,
    OrdQn: ELEMENTS.rating,
    Set: ELEMENTS.checkbox,
    Qn: ELEMENTS.number,
    Nar: ELEMENTS.text,
  };

export enum LONICPROPERTIES {
  Titr = "Titr",
  Pres = "Pres",
  MRat = "MRat",
  Time = "Time",
  Temp = "Temp",
  MFr = "MFr",
  NFr = "NFr",
  Arb = "Arb",
  Vel = "Vel",
  Len = "Len",
}

enum PROPERTIES {
  presence = "presence",
  fraction = "fraction",
  length = "length",
  titer = "titer",
  speed = "speed",
  time = "time",
  temp = "temp",
}

export const PropertyMap: Record<LONICPROPERTIES, PROPERTIES> = {
  Pres: PROPERTIES.presence,
  MFr: PROPERTIES.fraction,
  NFr: PROPERTIES.fraction,
  Titr: PROPERTIES.titer,
  Arb: PROPERTIES.titer,
  Vel: PROPERTIES.speed,
  MRat: PROPERTIES.speed,
  Len: PROPERTIES.length,
  Time: PROPERTIES.time,
  Temp: PROPERTIES.temp,
};

export enum SYSTEMS {
  custom = "custom",
  loinc = "loinc",
}

type Range = {
  unit: string;
  min: string;
  max: string;
};

export interface Observation {
  code: string;
  display: LocalizedText;
  system: SYSTEMS;
  class: string;
  scaleType: SCALETYPES;
  referenceRange?: Range;
  property: PROPERTIES;
  interpretation?: {
    display: LocalizedText;
    value: string;
  };
  formSchemaElements?: FormElements;
}

export type FormElements =
  | TextElement
  | NumberElement
  | RadioGroupElement
  | CheckboxElement
  | RatingElement;

export type BaseElement = {
  maskType?: "numeric" | "pattern";
  title: string | Record<string, string>;
  requiredErrorText?: string;
  validators?: Validator[];
  isRequired?: boolean;
  placeholder?: string;
  visibleIf?: string;
  name: string;
  maskSettings?: {
    pattern?: string;
    min?: number;
    max?: number;
  };
};

export interface TextElement extends BaseElement {
  maxLength?: number;
  type: "text";
}

export interface NumberElement extends BaseElement {
  type: "text";
  inputType: "number";
  min: string;
  max: string;
  step: string;
  minErrorText: string;
  maxErrorText: string;
  stepErrorText: string;
}

export interface Choice {
  value: string;
  text: string;
}

export interface RadioGroupElement extends BaseElement {
  type: "radiogroup";
  choices: Choice[];
  colCount?: number;
}

export interface CheckboxElement extends BaseElement {
  type: "checkbox";
  choices: Choice[];
  colCount?: number;
  maxSelectedChoices?: number;
  minSelectedChoices?: number;
}

export interface RatingElement extends BaseElement {
  type: "rating";
  rateMin?: number;
  rateMax?: number;
  step?: number;
  minRateDescription?: string;
  maxRateDescription?: string;
}

type Validator = {
  type: "text" | "numeric" | "regex";
  minLength?: number;
  maxLength?: number;
  minValue?: 200;
  maxValue?: 300;
  text: string;
};
