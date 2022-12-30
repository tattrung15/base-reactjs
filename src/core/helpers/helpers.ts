export const nullSafetyJSONStringify = (obj: any): string => {
  return JSON.stringify(obj, (k, v) => (v === null ? undefined : v));
};

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isStrEmpty(value: string): boolean {
  return isNullOrUndefined(value) || value.trim() === "";
}

export const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};

export const isStringEmpty = (value: string): boolean => {
  return isNullOrUndefined(value) || value.trim() === "";
};

export const titleCase = (str: string): string => {
  const splitStr = str.toLowerCase().split(/\s+/g);

  for (let i = 0; i < splitStr.length; i++) {
    const word = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

    splitStr[i] = word;
  }

  return splitStr.join(" ");
};
