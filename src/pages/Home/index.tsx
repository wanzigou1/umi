import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { num, setNum } = useModel('global');
  return (
    <PageContainer ghost>
      <h2>{num}</h2>
      <div className={styles.container}>
        <Button onClick={() => setNum(num + 1)}>+</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
