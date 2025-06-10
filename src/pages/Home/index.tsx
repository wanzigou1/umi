import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [num, setNum] = useState(1);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Button onClick={() => setNum(num + 1)}>+</Button>
        <Guide name={trim(name)} num={num} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
