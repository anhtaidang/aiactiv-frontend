export interface NodeProp {
  parentKey?: string | null;
  parentAllKeys?: string[] | null;
  title: string | JSX.Element;
  key: string;
  disable?: boolean;
  isExpand?: boolean;
  children?: NodeProp[] | boolean;
  level: number;
  display: boolean;
  childrenLevelKeys?: string[];
  childrenAllKeys?: string[];
  selected?: boolean;
  fetch?: boolean;
  total?: number;
  loading?: boolean;
}
