import { getHotList } from '@/services/hot';
import { useRequest } from '@umijs/max';
// import type { HotListResponse } from '../../types/index';

const Component = () => {
  const { data } = useRequest(getHotList);
  console.log(data);
};
export default Component;
