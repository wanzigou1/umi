import { getHotList } from '@/services/hot';
import { timeAgo } from '@/utils/format';
import { useRequest } from '@umijs/max';
import { Badge, Card, Col, List, Row, Skeleton, Typography } from 'antd';
import styles from './index.less';

const Component = () => {
  const { data } = useRequest(getHotList);
  const handleLink = (url: string): void => {
    window.open(url, '_blank');
  };
  if (!data?.length) return <Skeleton active />;

  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col span={8} key={item.id}>
          <Badge.Ribbon text={item.typeName}>
            <Card
              title={
                <div className={styles.titleContainer}>
                  <img src={item.iconUrl} alt="icon" width="20" height="20" />
                  <span className={styles.title}>{item.name}</span>
                  <span className={styles.timeText}>
                    {`(${timeAgo(item.updateTime)})`}
                  </span>
                </div>
              }
              styles={{
                body: {
                  padding: '12px',
                },
              }}
            >
              {
                <div className={styles.content}>
                  <List
                    size="small"
                    dataSource={item.data}
                    renderItem={(item, index) => (
                      <>
                        <List.Item
                          style={{
                            padding: '8px 0',
                            justifyContent: 'start',
                          }}
                        >
                          <Badge
                            count={index + 1}
                            color={
                              index < 3
                                ? index === 0
                                  ? '#ff4d4f'
                                  : index === 1
                                  ? '#fa8c16'
                                  : '#faad14'
                                : 'rgba(124, 124, 124, 0.3)'
                            }
                            style={{
                              marginRight: '8px',
                            }}
                          />
                          <Typography.Text
                            style={{
                              cursor: 'pointer',
                            }}
                            ellipsis={{ tooltip: item.title }}
                            onClick={() => handleLink(item.url)}
                          >
                            {item.title}
                          </Typography.Text>
                        </List.Item>
                      </>
                    )}
                  />
                </div>
              }
            </Card>
          </Badge.Ribbon>
        </Col>
      ))}
    </Row>
  );
};

export default Component;
