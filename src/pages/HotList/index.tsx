import { getHotList } from '@/services/hot';
import { SettingOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, Card, Col, Modal, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import HotCard from './components/HotCard';
import HotTree from './components/HotTree';

type Props = {
  title: string;
  key: string;
  isShow: boolean;
};
const HotList: React.FC = () => {
  const { data, loading } = useRequest(getHotList);
  const [filterData, setFilterData] = useState<Props[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortData, setSortData] = useState([]);
  useEffect(() => {
    const temp =
      data?.map((item) => {
        return {
          title: item.name,
          key: item.id,
          isShow: true,
        };
      }) || [];
    setFilterData(temp);
  }, [data]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log(sortData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const updateTreeData = (data: any) => {
    setSortData(data);
  };
  // 占位骨架
  if (loading || !data?.length) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Col span={8} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 10 }}></Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button type="dashed" icon={<SettingOutlined />} onClick={showModal}>
          配置
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col span={8} key={item.id}>
            <HotCard item={item}></HotCard>
          </Col>
        ))}
      </Row>
      <Modal
        title="配置热榜"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <HotTree
          initialData={filterData}
          updateTreeData={(data: any) => updateTreeData(data)}
        ></HotTree>
      </Modal>
    </>
  );
};

export default HotList;
