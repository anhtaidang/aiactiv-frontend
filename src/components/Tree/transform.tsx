import { v4 as uuidv4 } from "uuid";
import { NodeProp } from "~/components/Tree/type";
import _ from "lodash";
import { randomName } from "~/utils";

export const generalTreeDataSource = ({
  dataSource,
  level = 0,
  parentKey = null,
  parentAllKeys = null,
  display = true,
}: {
  dataSource: any;
  level?: number;
  parentKey?: string;
  parentAllKeys?: string[];
  display?: boolean;
}) => {
  let treeSource: Record<string | number, NodeProp> = {};

  dataSource.forEach((tree) => {
    const { key } = tree;
    treeSource[key] = {
      ...tree,
      level,
      parentKey,
      parentAllKeys,
      display,
    };

    const { children } = tree;
    if (children) {
      treeSource[key].isExpand = true;
      const newParentAllKeys = parentAllKeys ? [...parentAllKeys, key] : [key];
      const treeSourceResult = generalTreeDataSource({
        dataSource: children,
        level: level + 1,
        parentKey: key,
        parentAllKeys: newParentAllKeys,
        display: true,
      });
      treeSource[key].childrenLevelKeys = children.map((m) => m.key);
      treeSource[key].childrenAllKeys = Object.values(treeSourceResult).map(
        (tree) => tree.key
      );
      treeSource = Object.assign({
        ...treeSource,
        ...treeSourceResult,
      });
    }
  });
  return treeSource;
};

export const recursiveUnSelectedToParent =
  (key) => (dataSource, selectedKeys) => {
    let newSelectedKeys = [...selectedKeys];
    const node = dataSource[key];
    if (node.parentKey) {
      const parentNode = dataSource[node.parentKey];
      // console.log(parentNode.key);

      if (
        parentNode.childrenLevelKeys.some((k) => !newSelectedKeys.includes(k))
      ) {
        newSelectedKeys = newSelectedKeys.filter((f) => f !== parentNode.key);
      }

      newSelectedKeys = recursiveUnSelectedToParent(parentNode.key)(
        dataSource,
        newSelectedKeys
      );
    }
    return newSelectedKeys;
  };

export const recursiveSelectedToParent =
  (key) => (dataSource, selectedKeys) => {
    let newSelectedKeys = [...selectedKeys];
    const node = dataSource[key];
    if (node.parentKey) {
      const parentNode = dataSource[node.parentKey];
      // console.log(parentNode.key);
      if (
        parentNode.childrenLevelKeys.every((k) => newSelectedKeys.includes(k))
      ) {
        newSelectedKeys.push(parentNode.key);
      }

      newSelectedKeys = recursiveSelectedToParent(parentNode.key)(
        dataSource,
        newSelectedKeys
      );
    }
    return newSelectedKeys;
  };

export const recursiveAddChildrenKeysToParent =
  (key) => (dataSource, childrenKeys) => {
    let newDataSource = _.cloneDeep(dataSource);
    const node = newDataSource[key];
    const parentKey = node.parentKey;
    if (parentKey) {
      newDataSource[parentKey].childrenAllKeys = _.uniqBy([
        ...newDataSource[parentKey].childrenAllKeys,
        ...childrenKeys,
      ]);
      newDataSource = _.cloneDeep(
        recursiveAddChildrenKeysToParent(parentKey)(newDataSource, childrenKeys)
      );
    }
    return newDataSource;
  };

export const fetchNewNode = (key) => (dataSource, selectedKeys) => {
  const newDataSource = _.cloneDeep(dataSource);
  const node = { ...newDataSource[key] };

  const capitalizedName: string = randomName();
  const newNodeKey = uuidv4();

  // For Fetch Node
  newDataSource[key].loading = false;
  newDataSource[key].isExpand = true;
  newDataSource[key].childrenLevelKeys = newDataSource[key].childrenLevelKeys
    ? [...newDataSource[key].childrenLevelKeys, newNodeKey]
    : [newNodeKey];

  newDataSource[key].childrenAllKeys = newDataSource[key].childrenAllKeys
    ? [...newDataSource[key].childrenAllKeys, newNodeKey]
    : [newNodeKey];

  // New Node
  const newNode = {
    title: capitalizedName,
    key: newNodeKey,
    parentAllKeys: node.parentAllKeys
      ? [...node.parentAllKeys, node.key]
      : [node.key],
    parentKey: node.key,
    level: node.level + 1,
    display: true,
    fetch: true,
  } as NodeProp;

  // Transform order node
  let dataSourceTransform = {};
  const allKeysDataSource = Object.keys(dataSource);
  const indexFetchKey = allKeysDataSource.indexOf(key);

  allKeysDataSource.splice(
    indexFetchKey + newDataSource[key].childrenAllKeys.length,
    0,
    newNodeKey
  );

  allKeysDataSource.forEach((k) => {
    if (k === newNodeKey) {
      dataSourceTransform[newNodeKey] = newNode;
    } else {
      dataSourceTransform[k] = { ...newDataSource[k] };
    }
  });

  dataSourceTransform = {
    ...recursiveAddChildrenKeysToParent(key)(dataSourceTransform, [
      ...dataSourceTransform[key].childrenAllKeys,
      newNodeKey,
    ]),
  };

  const newSelectedKeys = recursiveUnSelectedToParent(newNodeKey)(
    dataSourceTransform,
    selectedKeys
  );

  const allChildrenKeysOfNode = dataSourceTransform[key].childrenLevelKeys;
  allChildrenKeysOfNode?.forEach((k) => {
    dataSourceTransform[k].display = true;
  });

  return { data: dataSourceTransform, selectedKeys: newSelectedKeys };
};
