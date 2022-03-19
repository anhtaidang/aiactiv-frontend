import React from "react";
import { Empty, Input } from "antd";
import styles from "./styles.module.scss";
import { NodeProp } from "~/components/Tree/type";
import {
  fetchNewNode,
  generalTreeDataSource,
  recursiveSelectedToParent,
  recursiveUnSelectedToParent,
} from "~/components/Tree/transform";
import _ from "lodash";
import TreeNode from "~/components/Tree/components/TreeNode";

interface TreeProp {
  dataSource: any;
  selectedKeys?: string[];
  onSelectChange?: (selectedKeys: string[]) => void;
}

const Tree = ({
  dataSource,
  selectedKeys: selectedKeysProp = [],
  onSelectChange: onSelectChangeProp,
}: TreeProp) => {
  const [searchText, setSearchText] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  const [treeDataSource, setTreeDataSource] =
    React.useState<Record<string | number, NodeProp>>(null);

  React.useEffect(() => {
    setSelectedKeys(selectedKeysProp);
  }, [selectedKeysProp]);

  React.useEffect(() => {
    const data = generalTreeDataSource({ dataSource: dataSource });
    console.log("dataSource:", data);
    setTreeDataSource(data);
  }, [dataSource]);

  // Expand
  const onToggleExpandNode = React.useCallback(
    (key) => () => {
      const newTreeDataSource = { ...treeDataSource };
      const { childrenAllKeys } = newTreeDataSource[key];

      const display = !newTreeDataSource[key].isExpand;

      // Set toggle staus of Node
      newTreeDataSource[key].isExpand = display;

      // Hide all children of Node
      childrenAllKeys.forEach((keyChildren) => {
        newTreeDataSource[keyChildren].display = display;
        newTreeDataSource[keyChildren].isExpand = display;
      });
      setTreeDataSource(newTreeDataSource);
    },
    [treeDataSource]
  );

  // Select
  const onToggleSelectedNode = React.useCallback(
    (key) => () => {
      let keyResults = [...selectedKeys];
      const isSelected = selectedKeys.includes(key);
      const node = treeDataSource[key];
      const keysChildren =
        node?.childrenAllKeys?.length > 0
          ? [key, ...node.childrenAllKeys]
          : [key];

      if (isSelected) {
        // key is exist
        keyResults = keyResults.filter((f) => !keysChildren.includes(f));
        keyResults = recursiveUnSelectedToParent(key)(
          treeDataSource,
          keyResults
        );
      } else {
        keyResults = [...keyResults, ...keysChildren];

        keyResults = recursiveSelectedToParent(key)(treeDataSource, keyResults);
      }
      setSelectedKeys(keyResults);
      if (typeof onSelectChangeProp === "function") {
        onSelectChangeProp(keyResults);
      }
    },
    [selectedKeys, treeDataSource]
  );

  const onfetchDataToNode = (key) => () => {
    const newDataSource = _.cloneDeep(treeDataSource);
    newDataSource[key].loading = true;
    setTreeDataSource(newDataSource);

    setTimeout(() => {
      const { data, selectedKeys: newSelectedKeys } = fetchNewNode(key)(
        newDataSource,
        selectedKeys
      );
      setTreeDataSource(data);
      setSelectedKeys(newSelectedKeys);
    }, 500);
  };

  const generalTreeListUI = React.useCallback(() => {
    return treeDataSource ? (
      Object.values(treeDataSource)
        .filter((obj) =>
          obj.title.toString().toLowerCase().includes(searchText.toLowerCase())
        )
        .map((tree, index) => {
          return (
            <TreeNode
              key={tree.key}
              treeDataSource={treeDataSource}
              node={tree}
              index={index}
              searchText={searchText}
              selectedKeys={selectedKeys}
              onfetchDataToNode={onfetchDataToNode}
              onToggleExpandNode={onToggleExpandNode}
              onToggleSelectedNode={onToggleSelectedNode}
            />
          );
        })
    ) : (
      <Empty />
    );
  }, [treeDataSource, selectedKeys, searchText]);

  return (
    <div className={styles.treeRoot}>
      <div className={styles.search}>
        <Input.Search
          value={searchText}
          placeholder="Search title"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={styles.treeList}>{generalTreeListUI()}</div>
    </div>
  );
};

export default Tree;
