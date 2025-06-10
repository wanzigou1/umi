import { Layout, Row, Typography } from 'antd';
import React, { memo } from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
  num: number;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  console.log('子组件重新渲染');
  const { name, num } = props;
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！<h2>当前是{num}</h2>
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default memo(Guide);
