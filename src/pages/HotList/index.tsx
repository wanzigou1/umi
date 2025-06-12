import { getHotList } from '@/services/hot';
import { useRequest } from '@umijs/max';
import { Col, Row, Skeleton } from 'antd';
import HotCard from './components/HotCard';
const Component = () => {
  const { data } = useRequest(getHotList);
  if (!data?.length) return <Skeleton active />;

  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col span={8} key={item.id}>
          <HotCard item={item}></HotCard>
        </Col>
      ))}
    </Row>
  );
};

export default Component;
