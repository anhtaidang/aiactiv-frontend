export type EnumStandardType = {
  value: any;
  label: string;
  [key: string]: any;
};

export interface EnumPropType<T = EnumStandardType> {
  [key: string]: T;
}

export enum EnumSortType {
  ASC = "ascend",
  DES = "descend",
}

export interface SortFieldType {
  name: string;
  sortOrder: EnumSortType;
}
