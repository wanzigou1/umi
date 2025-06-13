import type { TreeDataNode, TreeProps } from 'antd';
import { Tree } from 'antd';
import React, { useEffect, useState } from 'react';

type PropsType = {
  initialData: TreeDataNode[];
};
const App: React.FC<PropsType> = ({ initialData }) => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>(initialData);

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
  };
  useEffect(() => {
    console.log(treeData);
  }, [treeData]);

  return <Tree treeData={treeData} draggable blockNode onDrop={onDrop} />;
};

export default App;
