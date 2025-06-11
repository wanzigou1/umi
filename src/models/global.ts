// 全局共享数据示例
import { DEFAULT_NAME, DEFAULT_NUM } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [num, setNum] = useState<number>(DEFAULT_NUM);
  return {
    name,
    setName,
    num,
    setNum,
  };
};

export default useUser;
