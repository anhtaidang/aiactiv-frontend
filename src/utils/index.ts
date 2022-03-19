import { EnumPropType } from "~/types/enum";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function isNullOrEmpty(value) {
  return (
    value === undefined ||
    Number.isNaN(value) ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
}

export function isEmptyObject(obj) {
  if (obj !== null && obj !== undefined) return Object.keys(obj).length === 0;
  return true;
}

export function getTitleModal(title, detailId) {
  return `${title} ${!isNullOrEmpty(detailId) ? `- [Id: ${detailId}]` : ""}`;
}

export function getValueFromEvent(e) {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === "checkbox" ? target.checked : target.value;
}

export function convertEnumToSelectOps(enumData) {
  const lstReturn = [];
  Object.keys(enumData).forEach((key: string) =>
    lstReturn.push({
      value: enumData[key].value,
      label: enumData[key].label,
      ...enumData[key],
    })
  );
  return lstReturn;
}

export function resolveFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      resolve({
        file,
        imagePreviewUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
}

export function getOptionSelectByEnumValue(enumValue) {
  let obj = null;
  if (enumValue) {
    obj = {
      value: enumValue.value,
      label: enumValue.label,
    };
  }
  return obj;
}

export function getEnumValueById(value, enumType: EnumPropType) {
  let obj = null;
  if (!isNullOrEmpty(value) && enumType) {
    obj = Object.values(enumType).find((f) => f.value === value);
  }
  return obj
    ? {
        value: obj.value,
        label: obj.label,
        ...obj,
      }
    : null;
}

export function removeRequestParams(objectRequest, keysUncheck = []) {
  const requestData = { ...objectRequest };
  Object.keys(requestData).forEach((key) => {
    if (!keysUncheck.includes(key)) {
      if (isNullOrEmpty(requestData[key])) {
        delete requestData[key];
      }
    }
  });
  return requestData;
}

export function removeFalseRequestParams(objectRequest, keysUncheck = []) {
  const requestData = { ...objectRequest };
  Object.keys(requestData).forEach((key) => {
    if (!keysUncheck.includes(key)) {
      if (requestData[key] === false) {
        delete requestData[key];
      }
    }
  });
  return requestData;
}

export const fuzzySearch = (title = "", query = "") => {
  const search = query?.split(" ") ?? [];
  return title?.split(" ").reduce((found, i) => {
    let matches = 0;
    search?.forEach((s) => {
      if (i.toLowerCase().indexOf(s.toLowerCase()) > -1) {
        matches += 1;
      }
    });

    if (matches === search.length) {
      // was found
      found.push(i);
    }
    return found;
  }, []);
};

export const randomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: " ",
    style: "capital",
  });
};
