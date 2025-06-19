// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import BorderCollie from './assets/BorderCollie.png';
import './global.less';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    // logo: 'https://imgur.com/V7jN8ti.png',
    logo: BorderCollie,
    title: 'umimax',
    menu: {
      locale: false,
    },
    token: {
      sider: {
        colorTextMenuSelected: '#000000',
      },
    },
  };
};
