import { getHotList } from '@/services/hot';
import { SettingOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, Card, Col, Modal, Row, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import HotCard from './components/HotCard';
import HotTree from './components/HotTree';

type Props = {
  title: string;
  key: string;
  isShow: boolean;
};
const HotList: React.FC = () => {
  const { data, loading, mutate } = useRequest(getHotList);
  const [filterData, setFilterData] = useState<Props[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortData, setSortData] = useState<Props[]>([]);
  const originDataRef = useRef<any[]>([]);
  const hasInitRef = useRef(false);
  useEffect(() => {
    if (data && !hasInitRef.current) {
      hasInitRef.current = true; // 标记只初始化一次
      originDataRef.current = JSON.parse(JSON.stringify(data));
      const temp =
        data?.map((item) => {
          return {
            title: item.name,
            key: item.id,
            isShow: true,
          };
        }) || [];
      setFilterData(temp);
    }
  }, [data]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setFilterData(sortData);
    const temp = sortData
      .map((item) => {
        return {
          ...originDataRef.current?.find(
            (cur) => cur.id === item.key && item.isShow,
          ),
        };
      })
      .filter((item) => item.id);
    mutate(temp);
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
        destroyOnHidden={true}
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
