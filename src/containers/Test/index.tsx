import * as React from "react";
import Tree from "~/components/Tree";
import { useDispatch } from "react-redux";
import { resetTreeState, setTreeState } from "~/redux/app/actions";
import useSelector from "~/redux/hooks/useSelector";
import { Button, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { randomName } from "~/utils";

const treeData = [
  {
    title: randomName(),
    key: uuidv4(),
    children: [
      {
        title: randomName(),
        key: uuidv4(),
        children: [
          {
            title: randomName(),
            key: uuidv4(),
            fetch: true,
            children: [
              {
                title: randomName(),
                key: uuidv4(),
                fetch: true,
                children: [
                  {
                    title: randomName(),
                    key: uuidv4(),
                    fetch: true,
                  },
                  {
                    title: randomName(),
                    key: uuidv4(),
                    fetch: true,
                  },
                ],
              },
              {
                title: randomName(),
                key: uuidv4(),
                fetch: true,
              },
            ],
          },
          {
            title: randomName(),
            key: uuidv4(),
            fetch: true,
          },
        ],
      },
      {
        title: randomName(),
        key: uuidv4(),
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>{randomName()}</span>,
            key: uuidv4(),
            fetch: true,
          },
        ],
      },
    ],
  },
  {
    title: randomName(),
    key: uuidv4(),
  },
];

const Test = () => {
  const dispatch = useDispatch();

  const { selectedKeys: selectedKeysStore } = useSelector(
    (state) => state.app.treeState
  );

  const onSelectChange = (selectedKeys) => {
    dispatch(setTreeState({ selectedKeys }));
  };
  return (
    <div className="container-fluid">
      <div
        style={{
          width: 800,
          background: "#ececec",
          border: "1px solid #ececec",
          margin: "0px auto",
          marginTop: 150,
          padding: 10,
        }}
      >
        <h3 className="text-center">AIACTIV TEST</h3>
        {/*<Space direction="horizontal">*/}
        {/*  <Button onClick={() => dispatch(resetTreeState())} size="small">*/}
        {/*    Reset Tree state*/}
        {/*  </Button>*/}
        {/*</Space>*/}
        <div style={{ padding: 10, marginTop: 20 }}>
          <Tree
            dataSource={treeData}
            onSelectChange={onSelectChange}
            selectedKeys={selectedKeysStore}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
