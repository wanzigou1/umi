import React, { useEffect, useState } from 'react';
interface Props {
  value: number;
}
const ChildComponent: React.FC<Props> = ({ value }) => {
  console.log('ChildComponent render, value:', value);
  return <div>子组件值: {value}</div>;
};

function ParentComponent() {
  const [value, setValue] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      // 每次都设置为1，相同的值
      setValue(1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>父组件</h2>
      <ChildComponent value={value} />
    </div>
  );
}

export default ParentComponent;
