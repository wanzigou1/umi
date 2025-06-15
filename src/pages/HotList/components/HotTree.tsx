import type { TreeDataNode, TreeProps } from 'antd';
import { Tree } from 'antd';
import React, { useState } from 'react';
type CustomTreeNode = TreeDataNode & {
  isShow: boolean;
};
type PropsType = {
  initialData: CustomTreeNode[];
  updateTreeData: (data: TreeDataNode[]) => void;
};

const HotTree: React.FC<PropsType> = ({ initialData, updateTreeData }) => {
  const [treeData, setTreeData] = useState<CustomTreeNode[]>(initialData);
  const temp = initialData
    .filter((item) => item.isShow)
    .map((item) => item.key);
  const [defaultCheckedKeys] = useState(temp);

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPosition = info.dropPosition;

    const newData = [...treeData];
    const dragIndex = newData.findIndex((item) => item.key === dragKey);
    const dropIndex = newData.findIndex((item) => item.key === dropKey);
    if (dragIndex === -1 || dropIndex === -1) return;

    const [dragItem] = newData.splice(dragIndex, 1);
    const insertIndex = dropPosition < dragIndex ? dropIndex : dropIndex + 1;
    newData.splice(insertIndex, 0, dragItem);

    setTreeData(newData);
    updateTreeData(newData);
  };
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue: any) => {
    const temp = treeData.map((item) => {
      return {
        ...item,
        isShow: checkedKeysValue.includes(item.key),
      };
    });
    setTreeData(temp);
    updateTreeData(temp);
  };

  return (
    <Tree
      treeData={treeData}
      checkable
      draggable
      blockNode
      onDrop={onDrop}
      onCheck={onCheck}
      defaultCheckedKeys={defaultCheckedKeys}
    ></Tree>
  );
};

export default HotTree;
