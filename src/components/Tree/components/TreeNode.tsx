import React from "react";
import styles from "~/components/Tree/styles.module.scss";
import {
  PlusOutlined,
  MinusOutlined,
  CloudDownloadOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Checkbox, Space, Tooltip } from "antd";
import { NodeProp } from "~/components/Tree/type";
import { isNullOrEmpty } from "~/utils";

interface TreeNodeProp {
  node: NodeProp;
  treeDataSource: Record<string, NodeProp>;
  onToggleExpandNode: any;
  onfetchDataToNode: any;
  onToggleSelectedNode: any;
  selectedKeys: string[];
  index: number;
  searchText?: string;
}

const TreeNode = ({
  node,
  index,
  onToggleExpandNode,
  onfetchDataToNode,
  onToggleSelectedNode,
  selectedKeys,
  searchText = "",
}: TreeNodeProp) => {
  const {
    key,
    title,
    level,
    parentAllKeys,
    childrenLevelKeys,
    childrenAllKeys,
    isExpand,
    display,
    fetch,
    loading,
  } = node;

  const isSelected = selectedKeys.includes(key);

  const isSearch = !isNullOrEmpty(searchText);

  return display || !isNullOrEmpty(searchText) ? (
    <div key={key}>
      <div className={styles.treeNode}>
        {/* Indent Level */}
        {level > 0 &&
          Array.from(Array(level)).map((keyIndent, index) => (
            <span
              key={`${key}-${keyIndent}-${index}`}
              className={styles.treeIndentTransparent}
            />
          ))}

        {/* Expand Collap*/}
        {childrenLevelKeys ? (
          isExpand ? (
            <span className={styles.treeIndentTransparent}>
              <MinusOutlined
                onClick={onToggleExpandNode(key)}
                style={{ color: "#0268be", fontSize: 16 }}
              />
            </span>
          ) : (
            <span className={styles.treeIndentTransparent}>
              <PlusOutlined
                onClick={onToggleExpandNode(key)}
                style={{ color: "#0268be", fontSize: 16 }}
              />
            </span>
          )
        ) : fetch ? (
          <span className={styles.treeIndentTransparent}></span> // null
        ) : (
          <span className={styles.treeIndentTransparent}></span>
        )}

        {/* Fetch*/}
        {/*{fetch ? (*/}
        {/*  loading ? (*/}
        {/*    <span className={styles.treeIndentTransparent}>*/}
        {/*      <LoadingOutlined />*/}
        {/*    </span>*/}
        {/*  ) : (*/}
        {/*    !childrenLevelKeys && (*/}
        {/*      <span className={styles.treeIndentTransparent}>*/}
        {/*        <CloudDownloadOutlined*/}
        {/*          style={{ color: "#0268be", fontSize: 16 }}*/}
        {/*          onClick={onfetchDataToNode(key)}*/}
        {/*        />*/}
        {/*      </span>*/}
        {/*    )*/}
        {/*  )*/}
        {/*) : null}*/}

        <Checkbox
          indeterminate={
            !isSelected &&
            childrenAllKeys?.some((k) => selectedKeys.includes(k))
          }
          onChange={onToggleSelectedNode(key)}
          checked={selectedKeys.includes(key)}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {fetch ? (
              loading ? (
                <span className={styles.treeIndentTransparent}>
                  <LoadingOutlined />
                </span>
              ) : (
                // !childrenLevelKeys && (
                <span className={styles.treeIndentTransparent}>
                  <CloudDownloadOutlined
                    style={{
                      color: "#0268be",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                    onClick={onfetchDataToNode(key)}
                  />
                </span>
                // )
              )
            ) : null}
            <a
              style={{
                color: "black",
                fontSize: 14,
                ...(isSearch ? { color: "#ff4d4f", fontWeight: 400 } : {}),
              }}
            >
              {/*[{index + 1}] [Level: {level}]*/}
              {title} &nbsp;
              <Tooltip
                color="#1890ff"
                title={
                  <Space direction="vertical">
                    <span>Index: {index + 1}</span>
                    <span>Key: {key}</span>
                    <span>Title: {title}</span>
                    <span>Level: {level}</span>
                    <span>
                      ParentKeys: {parentAllKeys?.join(", ") ?? "N/A"}
                    </span>
                    <span>ChildrenKeys: {childrenAllKeys?.join(", ")}</span>
                  </Space>
                }
              >
                <EyeOutlined />
              </Tooltip>
            </a>
          </div>

          {/*{showLoadMore && (*/}
          {/*  <Button*/}
          {/*    type="link"*/}
          {/*    onClick={onfetchDataToNode(parentKey)}*/}
          {/*    style={{*/}
          {/*      textAlign: "left",*/}
          {/*      padding: "0 5px",*/}
          {/*      minHeight: 20,*/}
          {/*      marginLeft: -50,*/}
          {/*      background: "rgb(236, 236, 236)",*/}
          {/*    }}*/}
          {/*    disabled={parentNode.loading}*/}
          {/*  >*/}
          {/*    Load more children of [{parentKey}]*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  ) : null;
};

export default React.memo(TreeNode);
